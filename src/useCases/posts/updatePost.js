import Post from "../../entities/posts/Post.js";

async function updatePost(req, res) {
    try {
        const id = req.params.id;
        const { title, date, category, text } = req.body;

        const postFound = await Post.findById(id).populate("user");

        if (!postFound) {
            return res.status(404).json({ message: "Identificador de Postagem inexistente" });
        }

        if (postFound.user._id.toString() != req.userId) {
            return res
                .status(403)
                .json({ message: "Usuário não autorizado a atualizar esta postagem" });
        }

        postFound.title = title;
        postFound.date = date;
        postFound.category = category;
        postFound.text = text;
        postFound.save();

        res.status(200).json({ message: "Postagem atualizada", id: id });
    } catch (error) {
        console.log("updatePost:", error);
        res.status(500).json({ message: "Erro ao gravar a postagem" });
    }
}

export default updatePost;
