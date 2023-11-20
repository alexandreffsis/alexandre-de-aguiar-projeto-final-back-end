import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import createPost from "../useCases/posts/createPost.js";
import getPostById from "../useCases/posts/getPostById.js";
import getAllPosts from "../useCases/posts/getAllPosts.js";
import updatePost from "../useCases/posts/updatePost.js";
import deletePost from "../useCases/posts/deletePost.js";

const routerPost = express.Router();

routerPost.post("/post", verifyToken, createPost);
routerPost.get("/post/:id", verifyToken, getPostById);
routerPost.get("/posts", verifyToken, getAllPosts);
routerPost.put("/post/:id", verifyToken, updatePost);
routerPost.delete("/post/:id", verifyToken, deletePost);

export default routerPost;
