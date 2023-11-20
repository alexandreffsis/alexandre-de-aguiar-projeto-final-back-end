import User from "../../entities/users/User.js";
import bcrypt from "bcrypt";

async function createUser(req, res) {
    try {
        const { email, name, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: "E-mail já cadastrado" });
        }

        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        console.log(encryptedPassword);

        const newUser = new User({
            name: name,
            email: email,
            password: encryptedPassword,
        });

        newUser.save();
        res.status(200).json({
            message: `Bem-vindo(a) ao Blog, ${name} !`,
            id: newUser._id.toString(),
        });
    } catch (error) {
        console.log("createUser:", error);
        res.status(500).json({ message: "Erro ao cadastrar o usuário" });
    }
}

export default createUser;
