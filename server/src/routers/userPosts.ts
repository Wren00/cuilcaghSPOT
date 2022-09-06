import express from "express";
import { UserPostController } from "../controllers/userPosts";

const UserPostRouter = express.Router();

//PUBLIC endpoints

UserPostRouter.get("/getAllUserPosts", UserPostController.getAllUserPosts);
UserPostRouter.get("/getPostsByUserId/:id", UserPostController.getPostsByUserId);

//PRIVATE endpoints

UserPostRouter.post("/createUserPost", UserPostController.createUserPost);
UserPostRouter.delete("/deletePostById", UserPostController.deletePostById);


export { UserPostRouter };