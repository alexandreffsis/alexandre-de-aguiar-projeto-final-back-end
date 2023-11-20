import mongoose from "mongoose";
import { Schema } from "mongoose";

const workSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        default: Date.year,
    },
    client: {
        type: String,
        required: true,
        default: "nenhum",
    },
    text: {
        type: String,
        default: "",
    },
    image: {
        type: Buffer,
        default: null,
    },
    imageContentType: {
        type: String,
        default: null,
    },
    imageAlt: {
        type: String,
        default: "Nenhuma Imagem",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Work = mongoose.model("Work", workSchema);

export default Work;
