import { prisma } from "../utils";
import {SightingReactions, UserReactions} from "../interfaces/userReactions";
import {promisify} from "util";

//GET functions

async function getAllUserReactions() {
    let allReactions;
    try {
        allReactions = await prisma.reactions.findMany();
    } catch (error) {
        console.log(error);
    }
    const reactions: UserReactions[] = allReactions.map((x: { id: any; reaction_name: any; }) => ({
        reactionId: x.id,
        reactionName: x.reaction_name
    }));
    return reactions;
}

async function getUserReactionById(reactionId: number) {
    let reactionObject;

    try {
        reactionObject = await prisma.reactions.findUnique({
            where: { id: reactionId },
        });
    } catch (error) {
        console.log(error);
    }

    const returnedValue = {
        reactionId: reactionObject.id,
        reactionName: reactionObject.reaction_name
    };
    return returnedValue;
}

async function getAllSightingReactions() {
    let sightingReactionCount;

    sightingReactionCount = await prisma.sighting_to_reactions.findMany({
    });
//map
    const reactions: SightingReactions[] = sightingReactionCount.map((x: { sighting_id: number; reaction_id: number; reaction_count: number; }) => ({
        sightingId: x.sighting_id,
        reactionId: x.reaction_id,
        reactionCount: x.reaction_count
    }));
    return reactions;
}


async function getSightingReactionCountById(sightingId: number) {
    let sightingReactionCount;
    console.log(sightingId);

        sightingReactionCount = await prisma.sighting_to_reactions.findMany({
            where: {
                sighting_id : sightingId
            },
                });
//map
    const reactions: SightingReactions[] = sightingReactionCount.map((x: { sighting_id: number; reaction_id: number; reaction_count: number; }) => ({
        sightingId: x.sighting_id,
        reactionId: x.reaction_id,
        reactionCount: x.reaction_count
    }));
    return reactions;
}

//UPDATE functions

async function incrementUserReaction(sightingId: number, reactionId: number) {
    let updatedReaction;

    try {
        const sightingToReactionId = await prisma.sighting_to_reactions.findFirst({
            where: {
                sighting_id: sightingId,
                reaction_id: reactionId
            },
        });

        console.log(sightingToReactionId);

        if(sightingToReactionId)    {
            //update sighting_to_reaction with sightingToReactionId.id
            updatedReaction = await prisma.sighting_to_reactions.update({
                where: {
                    id: sightingToReactionId.id
                },
                    data: {
                        reaction_count: {
                            increment: 1,
                        },
                    },
        });
            return updatedReaction;
        }
        else {
            const createdReaction = await prisma.sighting_to_reactions.create({
                data: {
                    sighting_id: sightingId,
                    reaction_id: reactionId,
                    reaction_count: 1,
                },
            });
            return createdReaction;
        }
    } catch (error) {
        console.log(error);
    }
}

//CREATE function

async function createUserReaction(reaction: UserReactions) {
    let newReaction;
    try {
        newReaction = await prisma.reactions.create({
            data: {
                reaction_name: reaction.reactionName
            },
        });
    } catch (error) {
        console.log(error);
    }
    return newReaction;
}


//DELETE function

async function deleteUserReactionById(reactionId: number) {
    let deletedReaction;
    try {
        deletedReaction = await prisma.reactions.delete({
            where: {
                id: reactionId,
            },
        });
    } catch (error) {
        console.log(error);
    }
    return deletedReaction;
}


const UserReactionService = {
    getAllUserReactions,
    getUserReactionById,
    getSightingReactionCountById,
    incrementUserReaction,
    createUserReaction,
    deleteUserReactionById
};

export { UserReactionService };