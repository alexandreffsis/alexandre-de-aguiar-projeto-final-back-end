import Post from "../../entities/posts/Post.js";

async function deletePost(req, res) {
    try {
        const id = req.params.id;
        const postFound = await Post.findById(id).populate("user");

        if (!postFound) {
            return res.status(404).json({ message: "Identificador de Postagem inexistente" });
        }

        if (postFound.user._id.toString() != req.userId) {
            return res
                .status(403)
                .json({ message: "Usuário não autorizado a excluir esta postagem" });
        }

        const postDeleted = await postFound.deleteOne({ _id: id });

        if (!postDeleted || postDeleted.deletedCount == 0) {
            throw new Error(`A postagem ${id} não foi excluída`);
        }

        return res.status(204).json({ message: "Postagem excluída", id: id });
    } catch (error) {
        console.log("deletePost:", error);
        res.status(500).json({ message: "Erro ao excluir a postagem" });
    }
}

export default deletePost;
