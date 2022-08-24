import { prisma } from "../utils";
import { UserReactions, SightingReactions } from "../interfaces/userReactions";

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
        reactionNameName: x.reaction_name
    }));
    return reactions;
}

const UserReactionService = {
    getAllUserReactions
};

export { UserReactionService };