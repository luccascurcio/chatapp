import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    channel: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },    
});

export default mongoose.model("Chat", ChatSchema)