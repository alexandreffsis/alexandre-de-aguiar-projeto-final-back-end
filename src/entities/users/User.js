import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: Buffer,
        default: null,
    },
    avatarContentType: {
        type: String,
        default: null,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
