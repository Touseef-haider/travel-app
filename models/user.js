const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Profile = require("./profile");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
        },
        profile: {
            type: mongoose.Types.ObjectId,
            ref: "profile",
        },
        schema_version: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
            },
        },
    }
);

userSchema.pre("deleteOne", async function (next) {
    const profId = this.getQuery()?._id;
    try {
        await Profile.deleteOne({ user: profId });
        next();
    } catch (error) {
        next();
    }
});

module.exports = mongoose.model("user", userSchema);
