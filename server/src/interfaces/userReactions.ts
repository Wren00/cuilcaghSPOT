interface UserReactions {
    reactionId: number;
    reactionName: string;
}

interface SightingReactions {
    sightingReactionId: number;
    sightingId: number;
    reactionId: number;
    reactionCount: number;
}

export { UserReactions, SightingReactions };