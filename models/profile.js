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
       
        phone: {
            type: Schema.Types.Mixed,
        },
        is_deleted: {
            type: Boolean,
            default: false,
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

profileSchema.index({
    full_name: "text",
});

module.exports = mongoose.model("profile", profileSchema);
