import Work from "../../entities/works/Work.js";

async function deleteWork(req, res) {
    try {
        const id = req.params.id;
        const workFound = await Work.findById(id).populate("user");

        if (!workFound) {
            return res.status(404).json({ message: "Identificador de Trabalho inexistente" });
        }

        if (workFound.user._id.toString() != req.userId) {
            return res
                .status(403)
                .json({ message: "Usuário não autorizado a excluir este trabalho" });
        }

        const workDeleted = await workFound.deleteOne({ _id: id });

        if (!workDeleted || workDeleted.deletedCount == 0) {
            throw new Error(`O trabalho ${id} não foi excluído`);
        }

        return res.status(204).json({ message: "Trabalho excluído", id: id });
    } catch (error) {
        console.log("deleteWork:", error);
        res.status(500).json({ message: "Erro ao excluir o trabalho" });
    }
}

export default deleteWork;
