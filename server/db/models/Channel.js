import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Channel", ChannelSchema)