import express from "express";
import { UserReactionController } from "../controllers/userReactions";

const UserReactionRouter = express.Router();

//PUBLIC endpoints

UserReactionRouter.get("/getAllUserReactions", UserReactionController.getAllUserReactions);

//PRIVATE endpoints


export { UserReactionRouter };
