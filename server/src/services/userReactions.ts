import { prisma } from "../utils";
import { UserReactions } from "../interfaces/userReactions";

//GET functions

async function getAllUserReactions() {
    let allGroups;
    try {
        allGroups = await prisma.reactions.findMany();
    } catch (error) {
        console.log(error);
    }
    const reactions: UserReactions[] = allGroups.map((x: { id: any; reaction_name: any; }) => ({
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

async function getSightingReactionCountById(sightingId: number) {
    let sightingReactionCount;

    try {
        sightingReactionCount = await prisma.sighting_to_reactions.findMany({
            where: {
                sighting_id : sightingId
            },
                });
    } catch (error) {
        console.log(error);
    }

    const returnedValue = {
        reactionCount : sightingReactionCount.reaction_count
    };
    return returnedValue;
}



const UserReactionService = {
    getAllUserReactions,
    getUserReactionById,
    getSightingReactionCountById
};

export { UserReactionService };