import Post from "../../entities/posts/Post.js";

async function getPost(req, res) {
    try {
        const postId = req.params.id;
        const postExists = await Post.findById(postId).populate("user");

        if (!postExists) {
            return res.status(404).json({ message: "Postagem não encontrada" });
        }

        const resultAuthor = {
            id: postExists.user._id.toString(),
            name: postExists.user.name,
            email: postExists.user.email,
        };

        const result = {
            title: postExists.title,
            date: postExists.date,
            category: postExists.category,
            text: postExists.text,
            author: resultAuthor,
        };
        res.status(200).json(result);
    } catch (error) {
        console.log("getPostById:", error);
        res.status(500).json({ message: "Erro ao obter a postagem" });
    }
}

export default getPost;
