import { Request, Response } from "express";
import { UserReactionService } from "../services/userReactions";

async function getAllUserReactions(req: Request, res: Response) {
    try {
        const reactions = await UserReactionService.getAllUserReactions();
        return res.status(200).json(reactions);
    } catch (error) {
        res.status(401).json("Cannot access database");
    }
}

async function getUserReactionById(req: Request, res: Response) {
    try {
        const reactionId = req.body.reactionId;
        const reaction = await UserReactionService.getUserReactionById(reactionId);
        return res.status(200).json(reaction);
    } catch (error) {
        res.status(401).json("Cannot find reaction id");
    }
}

async function getSightingReactionCountById(req: Request, res: Response) {
    try {
        const sightingId = parseInt(req.params["id"]);

        const reactionCount = await UserReactionService.getSightingReactionCountById(sightingId);
        return res.status(200).json(reactionCount);
    } catch (error) {
        res.status(401).json("Cannot find sighting id");
    }
}


const UserReactionController = {
    getAllUserReactions,
    getUserReactionById,
    getSightingReactionCountById
};

export { UserReactionController };