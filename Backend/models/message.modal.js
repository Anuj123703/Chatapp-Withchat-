import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "conversation",
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        }

    },
    { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;