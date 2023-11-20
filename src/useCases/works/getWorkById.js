import Work from "../../entities/works/Work.js";

async function getWorkById(req, res) {
    try {
        const workId = req.params.id;
        const workExists = await Work.findById(workId).populate("user");

        if (!workExists) {
            return res.status(404).json({ message: "Trabalho não encontrado" });
        }

        const resultUser = {
            id: workExists.user._id.toString(),
            name: workExists.user.name,
            email: workExists.user.email,
        };

        let workImageEncoded = null;

        if (workExists.image) {
            workImageEncoded = workExists.image.toString("base64");
        }

        const result = {
            title: workExists.title,
            year: workExists.year,
            client: workExists.client,
            text: workExists.text,
            image: workImageEncoded,
            imageContentType: workExists.imageContentType,
            imageAlt: workExists.imageAlt,
            user: resultUser,
        };
        res.status(200).json(result);
    } catch (error) {
        console.log("getWorkById:", error);
        res.status(500).json({ message: "Erro ao obter o trabalho" });
    }
}

export default getWorkById;
