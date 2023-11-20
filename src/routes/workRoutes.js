import express from "express";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken.js";
import createWork from "../useCases/works/createWork.js";
import getWorkById from "../useCases/works/getWorkById.js";
import updateWorkImageById from "../useCases/works/updateWorkImageById.js";
import getAllWorks from "../useCases/works/getAllWorks.js";
import updateWork from "../useCases/works/updateWork.js";
import deleteWork from "../useCases/works/deleteWork.js";

const routerWork = express.Router();
const memoryStream = multer.memoryStorage();
const workImageHandler = multer({ storage: memoryStream });

routerWork.post("/work", verifyToken, createWork);
routerWork.get("/work/:id", verifyToken, getWorkById);
routerWork.get("/works", verifyToken, getAllWorks);
routerWork.put("/work/:id", verifyToken, updateWork);
routerWork.put(
    "/worksetimage/:id",
    [verifyToken, workImageHandler.single("image")],
    updateWorkImageById
);
routerWork.delete("/work/:id", verifyToken, deleteWork);

export default routerWork;
