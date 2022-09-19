import { Request, Response } from "express";
import { UserPostService } from "../services/userPosts";
import { UserPost } from "../interfaces/userPosts";

//GET functions

async function getAllUserPosts(req: Request, res: Response) {
    try {
        const posts = await UserPostService.getAllUserPosts();
        return res.status(200).json(posts);
    } catch (error) {
        res.status(401).json("Cannot access database");
    }
}

async function getPostById(req: Request, res: Response) {
    try {
        const postId = parseInt(req.params["id"]);
        console.log(postId);
        const post = await UserPostService.getPostById(postId);
        return res.status(200).json(post);
    } catch (error) {
        res.status(401).json("Cannot find post id");
    }
}

async function getPostsByUserId(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params["id"]);
        const posts = await UserPostService.getPostsByUserId(userId);
        return res.status(200).json(posts);
    } catch (error) {
        res.status(401).json("Cannot find user id");
    }
}
//CREATE function

async function createUserPost(req: Request, res: Response) {
    try {
        const newPost: UserPost = req.body;
        const createdPost = await UserPostService.createUserPost(newPost);
        return res.status(200).json(createdPost);
    } catch (error) {
        res.status(500).json("Could not create post.");
    }
}

//DELETE function

async function deletePostById(req: Request, res: Response) {
    const { postId: postId } = req.body;

    const deletedPost = await UserPostService.deletePostById(postId);
    if (!deletedPost) {
        return res.status(500).json("Cannot delete post");
    }
    return res.status(200).json(deletedPost);
}


const UserPostController = {
    getAllUserPosts,
    getPostsByUserId,
    getPostById,
    createUserPost,
    deletePostById
};

export { UserPostController };
