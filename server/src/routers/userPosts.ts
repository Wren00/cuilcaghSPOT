import express from "express";
import { UserPostController } from "../controllers/userPosts";

const UserPostRouter = express.Router();

//PUBLIC endpoints

UserPostRouter.get("/getAllUserPosts", UserPostController.getAllUserPosts);
UserPostRouter.get("/getPostById/:id", UserPostController.getPostById);

//PRIVATE endpoints

UserPostRouter.post("/createUserPost", UserPostController.createUserPost);
UserPostRouter.delete("/deletePostById", UserPostController.deletePostById);


export { UserPostRouter };
