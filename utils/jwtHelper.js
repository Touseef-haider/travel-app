const config = require("../config");
const JWT = require("jsonwebtoken");
const Profile = require("../models/profile");

const createError = require("http-errors");

module.exports = {
    signAccessToken: (payload, normal = true) =>
        new Promise((resolve, reject) => {
            const secret = config.jwt.secret;
            const options = {
                expiresIn: normal
                    ? config.jwt.expiry
                    : config.jwt.companyViewerLinkExpiry,
                issuer: "fixturecare.com",
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
            });
        }),

    // eslint-disable-next-line
    verifyAccessToken: (access_token) =>
        JWT.verify(access_token, config.jwt.secret, (err, payload) => {
            if (err) {
                const message =
                    err.name === "JsonWebTokenError"
                        ? "Unauthorized"
                        : err.message;
                throw createError(401, message);
            }
            return {
                // eslint-disable-next-line
                ...payload,
            };
        }),

    signRefreshToken: (profile) =>
        new Promise((resolve, reject) => {
            const payload = {
                ...profile,
            };
            const secret = config.jwt.secret;
            const options = {
                expiresIn: config.jwt.refreshExpiry,
                issuer: "fixturecare.com",
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError(err.message));
                }
                resolve(token);
            });
        }),
 
    // eslint-disable-next-line
    verifyRefreshToken: (refreshToken) =>
        new Promise((resolve, reject) =>
            JWT.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, payload) => {
                    if (err)
                        return reject(
                            createError.Unauthorized("Refresh Token Expired")
                        );
                    const profile = await Profile.findOne({
                        // eslint-disable-next-line
                        _id: payload.aud,
                    });
                    const profileId = payload.aud;
                    // eslint-disable-next-line
                    if (profileId == profile?._id) {
                        resolve(profile);
                    }
                }
            )
        ),
};
