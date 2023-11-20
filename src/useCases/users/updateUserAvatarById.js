import User from "../../entities/users/User.js";

async function updateUserAvatarById(req, res) {
    try {
        const id = req.params.id;
        const userFound = await User.findById(id);

        if (!userFound) {
            return res.status(404).json({ message: "Identificador de Usuário inexistente" });
        }

        let avatarBuffer = null;
        let avatarContentType = null;

        if (req.file) {
            avatarBuffer = req.file.buffer;
            avatarContentType = req.file.mimetype;
        }

        if (userFound._id.toString() != req.userId) {
            return res
                .status(403)
                .json({ message: "Usuário não autorizado a atualizar este avatar" });
        }

        userFound.avatar = avatarBuffer;
        userFound.avatarContentType = avatarContentType;
        userFound.save();

        res.status(200).json({ message: "Avatar do usuáro atualizado", id: id });
    } catch (error) {
        console.log("updateUserAvatarById:", error);
        res.status(500).json({ message: "Erro ao atualizar o avatar do usuário" });
    }
}

export default updateUserAvatarById;
