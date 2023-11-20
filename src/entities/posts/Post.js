import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    category: {
        type: String,
        default: "Sem categoria",
    },
    text: {
        type: String,
        default: "",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
