const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
    {
        full_name: {
            type: String,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        role: {
            type: mongoose.Types.ObjectId,
            ref: "role",
        },
        phone: {
            type: Schema.Types.Mixed,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        company: {
            type: mongoose.Types.ObjectId,
            ref: "company",
        },
        campus: [
            {
                type: mongoose.Types.ObjectId,
                ref: "campus",
            },
        ],
        is_deleted: {
            type: Boolean,
            default: false,
        },
        has_all_campus_access: {
            type: Boolean,
            default: false,
        },
        facility_access: {
            type: Boolean,
            default: false,
        },
        schema_version: {
            type: Number,
            default: 0,
        },
        fcm_token: [
            {
                type: String,
            },
        ],
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

profileSchema.index({
    full_name: "text",
});

module.exports = mongoose.model("profile", profileSchema);
