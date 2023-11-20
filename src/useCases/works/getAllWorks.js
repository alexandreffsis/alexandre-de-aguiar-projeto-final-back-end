import Work from "../../entities/works/Work.js";

async function getAllWorks(req, res) {
    try {
        const workId = req.params.id;
        const workList = await Work.find().populate("user").limit(10).sort("date");

        if (!workList) {
            return res.status(404).json({ message: "Nenhum Trabalho encontrado" });
        }

        let result = [];
        var resultRowUser;
        var resultRow;

        workList.forEach((row) => {
            resultRowUser = {
                id: row.user._id.toString(),
                name: row.user.name,
                email: row.user.email,
            };

            let workImageEncoded = null;

            if (row.image) {
                workImageEncoded = row.image.toString("base64");
            }

            resultRow = {
                title: row.title,
                year: row.year,
                client: row.client,
                text: row.text,
                image: workImageEncoded,
                imageContentType: row.imageContentType,
                imageAlt: row.imageAlt,
                user: resultRowUser,
            };

            result.push(resultRow);
        });

        res.status(200).json(result);
    } catch (error) {
        console.log("getAllWorks:", error);
        res.status(500).json({ message: "Erro ao obter os trabalhos" });
    }
}

export default getAllWorks;
