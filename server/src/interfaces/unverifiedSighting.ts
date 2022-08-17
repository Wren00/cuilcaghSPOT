interface UnverifiedSighting {
    
    sightingId: number;
    organismId: number;
    organismName: string;
    userName: string;
    userId: number;
    pictureUrl: string;
    date: Date;
    lat: number;
    long: number;
    userVotes: number;
    userReactions: number;
    
    }
    
    export { UnverifiedSighting };