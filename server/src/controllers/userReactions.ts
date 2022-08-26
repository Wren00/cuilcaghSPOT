import { Request, Response } from "express";
import { UserReactionService } from "../services/userReactions";
import {UserReactions, SightingReactions} from "../interfaces/userReactions";

//GET functions

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
        const sightingId = req.body.sightingId;

        const reactionCount = await UserReactionService.getSightingReactionCountById(sightingId);
        return res.status(200).json(reactionCount);
    } catch (error) {
        res.status(401).json("Cannot find sighting id");
    }
}

async function incrementUserReaction(req: Request, res: Response) {
    try {

        const reactionUpvote : SightingReactions = req.body;

        console.log(reactionUpvote);

        const reactionCount = await UserReactionService.incrementUserReaction(reactionUpvote.sightingId, reactionUpvote.reactionId);
        return res.status(200).json(reactionCount);
    } catch (error) {
        res.status(401).json("Cannot find id");
    }
}


//CREATE function

async function createUserReaction(req: Request, res: Response) {
    try {
        const newReaction: UserReactions = req.body;
        const createdReaction = await UserReactionService.createUserReaction(newReaction)
        return res.status(200).json(createdReaction);
    } catch (error) {
        res.status(500).json("Could not create reaction.");
    }
}

//DELETE function

async function deleteUserReactionById(req: Request, res: Response) {
    const { reactionId: reactionId } = req.body;

    const deletedReaction = await UserReactionService.deleteUserReactionById(reactionId);
    if (!deletedReaction) {
        return res.status(500).json("Cannot delete reaction");
    }
    return res.status(200).json(deletedReaction);
}


const UserReactionController = {
    getAllUserReactions,
    getUserReactionById,
    getSightingReactionCountById,
    incrementUserReaction,
    createUserReaction,
    deleteUserReactionById
};

export { UserReactionController };