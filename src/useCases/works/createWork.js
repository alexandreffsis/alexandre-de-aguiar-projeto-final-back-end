import Work from "../../entities/works/Work.js";

async function createWork(req, res) {
    try {
        const { title, year, client, text } = req.body;

        const workExists = await Work.findOne({ title, year, client });

        if (workExists) {
            return res.status(409).json({ message: "Trabalho já enviado" });
        }

        const newWork = new Work({
            title: title,
            year: year,
            client: client,
            text: text,
            user: req.userId,
        });

        newWork.save();
        res.status(200).json({ message: "Trabalho gravado", id: newWork._id.toString() });
    } catch (error) {
        console.log("createWork:", error);
        res.status(500).json({ message: "Erro ao gravar o trabalho" });
    }
}

export default createWork;
