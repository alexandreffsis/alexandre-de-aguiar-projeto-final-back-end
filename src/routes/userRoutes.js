import express from "express";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken.js";
import verifyTokenAPI from "../middlewares/verifyTokenAPI.js";
import createUser from "../useCases/users/createUser.js";
import loginUser from "../useCases/users/loginUser.js";
import updateUserAvatarById from "../useCases/users/updateUserAvatarById.js";

const routerUser = express.Router();
const memoryStream = multer.memoryStorage();
const userAvatarHandler = multer({ storage: memoryStream });

routerUser.post("/user", verifyTokenAPI, createUser);
routerUser.post("/user/login", verifyTokenAPI, loginUser);
routerUser.put(
    "/usersetavatar/:id",
    [verifyToken, userAvatarHandler.single("avatar")],
    updateUserAvatarById
);

export default routerUser;
