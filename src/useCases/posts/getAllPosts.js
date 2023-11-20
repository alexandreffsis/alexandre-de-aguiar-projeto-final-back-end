import Post from "../../entities/posts/Post.js";

async function getAllPosts(req, res) {
    try {
        const postId = req.params.id;
        const postList = await Post.find().populate("user").limit(10).sort("date");

        if (!postList) {
            return res.status(404).json({ message: "Nenhuma Postagem encontrada" });
        }

        let result = [];
        var resultRowAuthor;
        var resultRow;

        postList.forEach((row) => {
            resultRowAuthor = {
                id: row.user._id.toString(),
                name: row.user.name,
                email: row.user.email,
            };

            resultRow = {
                title: row.title,
                date: row.date,
                category: row.category,
                text: row.text,
                author: resultRowAuthor,
            };

            result.push(resultRow);
        });

        res.status(200).json(result);
    } catch (error) {
        console.log("getAllPosts:", error);
        res.status(500).json({ message: "Erro ao obter as postagens" });
    }
}

export default getAllPosts;
