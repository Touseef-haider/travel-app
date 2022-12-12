const createError = require("http-errors");
const User = require("../models/user");
const Profile = require("../models/profile");
const { hashPassword, verifyPassword } = require("../utils/authentications");
const { signAccessToken, signRefreshToken } = require("../utils/jwtHelper");

exports.register = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    console.log(req.body);

    let hashed;
    if (password) {
      hashed = await hashPassword(password);
    }
    const userData = {
      email,
      password: hashed,
    };

    const profileData = {
      first_name,
      last_name,
    };

    const userExist = await User.findOne({ email });
    if (userExist)
      return next(createError(400, "User already exists with this email"));

    const user = new User(userData);

    const profile = new Profile(profileData);
    user.profile = profile?._id;
    profile.user = user._id;

    const accessToken = await signAccessToken({
      _id: profile?._id,
      role: profile?.role,
      password: user?.password,
      email: profile?.user?.email,
      full_name: profile?.full_name,
    });

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
    const users = await User.find({});

    return res.status(200).json(users);
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

    const user = await User.findOne({ email }).lean();

    if (!user)
      return next(createError(400, "*Please check your email and Password"));
    if (!user?.password)
      return next(createError(400, "*Please create your password"));

    const profile = await Profile.findById({ _id: user?.profile }).lean();

    if (profile?.is_deleted) return next(createError(400, "*User is deleted"));

    const verifyPwd = await verifyPassword(password, user?.password);

    if (!verifyPwd)
      return next(createError(400, "*Please check your email and Password"));

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
      ...profile,
      ...user,
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

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(400, "*Email does not exist"));
    }

    const profile = await Profile.findOne({ user: user?._id });

    const accessToken = await signAccessToken({
      ...profile,
    });
    const refreshToken = await signRefreshToken({
      ...profile,
    });

    return res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    return next(err);
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
