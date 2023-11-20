import dotEnv from "dotenv";

function verifyTokenAPI(req, res, next) {
    const token = req.headers["apikey"];

    try {
        dotEnv.config();
        const apiKey = process.env.apiKEY;
        let tokenClean = "";

        if (token) {
            tokenClean = token.replace(/^Bearer\s+/, "");
        }

        if (!token || !apiKey.includes(tokenClean)) {
            return res.status(401).json({ message: "Acesso não autorizado" });
        }

        next();
    } catch (error) {
        console.log("verifyTokenAPI:", error);
        return res.status(401).json({ message: "Acesso não autorizado" });
    }
}

export default verifyTokenAPI;
