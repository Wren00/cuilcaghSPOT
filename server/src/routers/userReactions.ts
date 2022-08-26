import express from "express";
import { UserReactionController } from "../controllers/userReactions";

const UserReactionRouter = express.Router();

//PUBLIC endpoints

UserReactionRouter.get("/getAllUserReactions", UserReactionController.getAllUserReactions);
UserReactionRouter.get("/getUserReactionById", UserReactionController.getUserReactionById);
UserReactionRouter.get("/getSightingReactionCountById", UserReactionController.getSightingReactionCountById);

//PRIVATE endpoints

UserReactionRouter.put("/incrementUserReaction", UserReactionController.incrementUserReaction);
UserReactionRouter.post("/createUserReaction", UserReactionController.createUserReaction);
UserReactionRouter.delete("/deleteUserReactionById", UserReactionController.deleteUserReactionById);



export { UserReactionRouter };
