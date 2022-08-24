import express from "express";
import { UserReactionController } from "../controllers/userReactions";

const UserReactionRouter = express.Router();

//PUBLIC endpoints

UserReactionRouter.get("/getAllUserReactions", UserReactionController.getAllUserReactions);
UserReactionRouter.get("/getUserReactionById", UserReactionController.getUserReactionById);
UserReactionRouter.get("/getSightingReactionCountById/:id", UserReactionController.getSightingReactionCountById);

//PRIVATE endpoints




export { UserReactionRouter };
