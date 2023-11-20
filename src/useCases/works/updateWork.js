import Work from "../../entities/works/Work.js";

async function updateWork(req, res) {
    try {
        const id = req.params.id;
        const { title, year, client, text } = req.body;

        const workFound = await Work.findById(id).populate("user");

        if (!workFound) {
            return res.status(404).json({ message: "Identificador de Trabalho inexistente" });
        }

        if (workFound.user._id.toString() != req.userId) {
            return res
                .status(403)
                .json({ message: "Usuário não autorizado a atualizar este trabalho" });
        }

        workFound.title = title;
        workFound.year = year;
        workFound.client = client;
        workFound.text = text;
        workFound.save();

        res.status(200).json({ message: "Trabalho atualizado", id: id });
    } catch (error) {
        console.log("updateWork:", error);
        res.status(500).json({ message: "Erro ao gravar o trabalho" });
    }
}

export default updateWork;
