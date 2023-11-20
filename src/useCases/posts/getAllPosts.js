import Post from "../../entities/posts/Post.js";

async function getAllPosts(req, res) {
    try {
        const postList = await Post.find()
            .select("-__v")
            .populate({ path: "user", select: "-avatar -avatarContentType -password -__v" })
            .limit(10)
            .sort("date");

        if (!postList) {
            return res.status(404).json({ message: "Nenhuma Postagem encontrada" });
        }

        res.status(200).json(postList);
    } catch (error) {
        console.log("getAllPosts:", error);
        res.status(500).json({ message: "Erro ao obter as postagens" });
    }
}

export default getAllPosts;
