import { Prisma } from "@prisma/client";
import { StringLiteral } from "typescript";

interface UnverifiedSighting {

    organismId: number;
    userId: number;
    pictureURL: string;
    date: string;
    lat: number;
    long: number;
    userVotes: number;
    userReactions: number;
    
    }
    
    export { UnverifiedSighting };