import User from "../../entities/users/User.js";
import bcrypt from "bcrypt";
import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

async function loginUser(req, res) {
    try {
        const { email, password, rememberme } = req.body;
        const userFound = await User.findOne({ email });

        if (userFound) {
            const validPassword = bcrypt.compareSync(password, userFound.password);

            if (!validPassword) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            } else {
                dotEnv.config();
                const apiKey = process.env.passwordKEY;
                let expiresIn = "";

                if (!rememberme) {
                    expiresIn = "24h";
                }

                let avatarEncoded = null;

                if (userFound.avatar) {
                    avatarEncoded = userFound.avatar.toString("base64");
                }

                const token = jwt.sign({ id: userFound._id }, apiKey, expiresIn);
                return res.status(200).json({
                    message: `Bem-vindo(a), ${userFound.name} !`,
                    name: userFound.name,
                    avatar: avatarEncoded,
                    token,
                });
            }
        } else {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (error) {
        console.log("loginUser:", error);
        res.status(500).json({ message: "Erro ao autenticar o usuário" });
    }
}

export default loginUser;
