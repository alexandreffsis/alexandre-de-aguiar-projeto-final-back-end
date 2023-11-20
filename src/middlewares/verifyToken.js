import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

function verifyToken(req, res, next) {
    const token = req.headers["token"];

    if (!token) {
        return res.status(401).json({ message: "Acesso não autenticado" });
    }
    try {
        dotEnv.config();
        const apiKey = process.env.passwordKEY;
        const tokenClean = token.replace(/^Bearer\s+/, "");
        const tokenDecoded = jwt.verify(tokenClean, apiKey);
        req.userId = tokenDecoded.id;
        next();
    } catch (error) {
        console.log("verifyToken:", error);
        return res.status(401).json({ message: "Token inválido" });
    }
}

export default verifyToken;
