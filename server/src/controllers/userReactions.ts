import { Request, Response } from "express";
import { UserReactionService } from "../services/userReactions";
import { UserReactions, SightingReactions } from "../interfaces/userReactions";

async function getAllUserReactions(req: Request, res: Response) {
    try {
        const reactions = await UserReactionService.getAllUserReactions();
        return res.status(200).json(reactions);
    } catch (error) {
        res.status(401).json("Cannot access database");
    }
}

const UserReactionController = {
    getAllUserReactions
};

export { UserReactionController };