const { verifyAccessToken } = require("../utils/jwtHelper");
const Profile = require("../models/profile");
const createError = require("http-errors");

const requireAuth = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return next(createError(401, "Unauthorized"));
    }

    try {
        const payload = verifyAccessToken(token);
        const profile = await Profile.findById({
            _id: payload._id,
        }).populate("user");

        const isValid = payload?.password === profile?.user?.password;

        if (!isValid) {
            return next(createError(401, "Unauthorized"));
        }
        if (!profile?.user?._id) {
            throw createError(401, "User not found");
        }
        req.user = payload;
        next();
    } catch (err) {
        return next(err);
    }
};

module.exports = requireAuth;
