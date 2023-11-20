import Post from "../../entities/posts/Post.js";

async function createPost(req, res) {
    try {
        const { title, date, category, text } = req.body;

        const postExists = await Post.findOne({ title, date });

        if (postExists) {
            return res.status(409).json({ message: "Postagem já enviada" });
        }
        const newPost = new Post({
            title: title,
            date: date,
            category: category,
            text: text,
            user: req.userId,
        });

        newPost.save();
        res.status(200).json({ message: "Postagem gravada", id: newPost._id.toString() });
    } catch (error) {
        console.log("createPost:", error);
        res.status(500).json({ message: "Erro ao gravar a postagem" });
    }
}

export default createPost;
