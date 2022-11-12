const createError = require("http-errors");
const User = require("../models/user");
const Profile = require("../models/profile");
const { hashPassword, verifyPassword } = require("../utils/authentications");
const {
    signAccessToken,
    signRefreshToken,
} = require("../utils/jwtHelper");

exports.addUser = async (req, res, next) => {
    try {
        const {
            email,
            password,
            full_name,
            role,
            is_active,
            phone,
            campus,
            company,
        } = req.body;

        const particularRole = await Role.findById({
            _id: role,
        });

        if (
            particularRole?.name?.toLowerCase() === ROLES.COMPANY_VIEWER &&
            !company
        ) {
            return next(createError(403, "company is required"));
        }

        let hashed;
        if (password) {
            hashed = await hashPassword(password);
        }
        const userData = {
            email,
            password: hashed,
        };

        const profileData = {
            full_name,
            is_active,
            phone,
            role,
            company,
        };

        const userExist = await User.findOne({ email });
        if (userExist)
            return next(
                createError(400, "User already exists with this email")
            );

        const user = new User(userData);

        const profile = new Profile(profileData);
        user.profile = profile?._id;
        profile.user = user._id;

        let isAdmin = profile?.role?.name?.toLowerCase() === ROLES.ADMIN;

        const accessToken = await signAccessToken(
            {
                _id: profile?._id,
                role: profile?.role,
                password: user?.password,
                email: profile?.user?.email,
                full_name: profile?.full_name,
            },
            isAdmin ? true : false
        );

        if (req?.user?._id) {
            profile.added_by = req.user._id;
        }
        if (campus?.length > 0) {
            const isAll = campus.find((c) => c._id === "all");
            if (isAll) {
                const companyCampuses = await Campus.find({
                    company: req.body.company,
                });
                profile.campus = companyCampuses;
                profile.has_all_campus_access = true;
            } else {
                profile.campus = campus;
                profile.has_all_campus_access = false;
            }
        }
        user.token = accessToken;
        await user.save();
        await profile.save();

        return res.status(200).json({
            message: "User added successfully",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const { limit, page, search } = req.query;
        const l = parseInt(limit, 10) || 1;
        const p = parseInt(page, 10) || 10;
        const customQuery = getUsersQuery(req.query);
        if (search === "" || search === undefined) {
            const profiles = await Profile.aggregate([
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "user",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },

                {
                    $lookup: {
                        from: "roles",
                        foreignField: "_id",
                        localField: "role",
                        as: "role",
                    },
                },

                {
                    $unwind: {
                        path: "$role",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "permissions",
                        foreignField: "_id",
                        localField: "role.permission",
                        as: "permission",
                    },
                },
                {
                    $match: customQuery,
                },
                {
                    $facet: {
                        data: [
                            {
                                $skip: paginate(p, l),
                            },
                            {
                                $limit: l,
                            },
                        ],
                        total: [
                            {
                                $count: "total",
                            },
                        ],
                    },
                },
            ]);

            return res.status(200).json({
                data: profiles[0]?.data,
                total: profiles[0]?.total[0]?.total,
            });
        } else {
            const profiles = await Profile.aggregate([
                {
                    $search: {
                        index: "default",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*",
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "user",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },

                {
                    $lookup: {
                        from: "roles",
                        foreignField: "_id",
                        localField: "role",
                        as: "role",
                    },
                },

                {
                    $unwind: {
                        path: "$role",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "permissions",
                        foreignField: "_id",
                        localField: "role.permission",
                        as: "permission",
                    },
                },

                {
                    $match: customQuery,
                },
            ]);

            return res.status(200).json({
                data: profiles || [],
                total: profiles?.length || 0,
            });
        }
    } catch (error) {
        return next(error);
    }
};

exports.getParticularUser = async (req, res, next) => {
    try {
        const user = await User.findById({
            _id: req.params.id,
        });

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return next(
                createError(400, "*Please check your email and Password")
            );
        if (!user?.password)
            return next(createError(400, "*Please create your password"));

        const profile = await Profile.findById({ _id: user?.profile }).populate(
            "role"
        );

        if (profile?.is_deleted)
            return next(createError(400, "*User is deleted"));

        if (profile?.role?.name !== ROLES.ADMIN)
            return next(createError(400, "Role must be admin"));
        if (!profile?.is_active) {
            return next(
                createError(
                    401,
                    "*Please contact Admin to check that your account is active in the system"
                )
            );
        }
        const verifyPwd = await verifyPassword(password, user?.password);

        if (!verifyPwd)
            return next(
                createError(400, "*Please check your email and Password")
            );

        const accessToken = await signAccessToken({
            _id: profile?._id,
            role: profile?.role,
            password: user?.password,
            email: profile?.user?.email,
            full_name: profile?.full_name,
        });
        const refreshToken = await signRefreshToken({
            _id: profile?._id,
            role: profile?.role,
            email: profile?.user?.email,
            password: user?.password,
            full_name: profile?.full_name,
        });

        return res.status(200).json({
            access_token: accessToken,
            refresh_token: refreshToken,
            id: profile?._id,
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        delete req.body._id;

        return User.updateOne(
            { _id: req.params.id },
            { ...req.body, last_updated_by: req.user._id },
            { new: true }
        ).then(async () => {
            let { campus } = req.body;
            if (campus?.length > 0) {
                const isAll = campus.find((c) => c._id === "all");
                if (isAll) {
                    const companyCampuses = await Campus.find({
                        company: req.body.company,
                    });
                    campus = companyCampuses;
                }
            }
            if (campus) {
                Profile.updateOne(
                    { user: req.params.id },
                    {
                        ...req.body,
                        campus: campus ?? [],
                    }
                ).then((profileResult) => {
                    return res
                        .status(200)
                        .json({ message: "User updated", data: profileResult });
                });
            } else {
                Profile.updateOne(
                    { _id: req.params.id },
                    {
                        ...req.body,
                        campus: campus ?? [],
                    }
                ).then((profileResult) => {
                    return res
                        .status(200)
                        .json({ message: "User updated", data: profileResult });
                });
            }
        });
    } catch (error) {
        return next(error);
    }
};
exports.getUserOfParticularEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.query.email.toLowerCase(),
        });
        if (user) {
            return res.status(200).json({
                message: "Email exist",
                user,
            });
        }
        return res.status(200).json({
            message: "Email does not exist",
            status: 404,
        });
    } catch (error) {
        return next(error);
    }
};




exports.deleteUser = async (req, res, next) => {
    try {
        await Profile.findOneAndUpdate(
            { user: req.params.id },
            {
                is_deleted: true,
            }
        );

        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return next(error);
    }
};
