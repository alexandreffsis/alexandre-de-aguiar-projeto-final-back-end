import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotEnv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import workRouter from "./routes/workRoutes.js";

const app = express();
dotEnv.config();

const port = 5050;
const mongoPassword = process.env.passwordMONGO;
const mongodbURL = `mongodb+srv://admin:${mongoPassword}@curso-backend.fkffc0j.mongodb.net/projeto-final`;

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("index: Conectou ao MongoDB");
    })
    .catch((error) => {
        console.log("index: Erro ao conectar ao MongoDB", error);
    });

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", workRouter);

app.listen(port, () => {
    console.log("index: Aplicação iniciada");
});
