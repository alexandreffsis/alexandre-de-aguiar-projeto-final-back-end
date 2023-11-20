import Work from "../../entities/works/Work.js";

async function updateWorkImageById(req, res) {
    try {
        const id = req.params.id;
        const workFound = await Work.findById(id).populate("user");

        if (!workFound) {
            return res.status(404).json({ message: "Identificador de Trabalho inexistente" });
        }

        if (workFound.user._id.toString() != req.userId) {
            return res
                .status(403)
                .json({ message: "Usuário não autorizado a atualizar este trabalho" });
        }

        let imageBuffer = null;
        let imageContentType = null;
        let imageAlt = "Nenhuma imagem";

        if (req.file) {
            imageBuffer = req.file.buffer;
            imageContentType = req.file.mimetype;
            imageAlt = req.body.imageAlt;
        }

        workFound.image = imageBuffer;
        workFound.imageContentType = imageContentType;
        workFound.imageAlt = imageAlt;
        workFound.save();

        res.status(200).json({ message: "Imagem do trabalho atualizada", id: id });
    } catch (error) {
        console.log("updateWorkImageById:", error);
        res.status(500).json({ message: "Erro ao atualizar a imagem do trabalho" });
    }
}

export default updateWorkImageById;
