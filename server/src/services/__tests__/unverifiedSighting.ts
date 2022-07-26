jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { Prisma, unverified_sightings } from "@prisma/client";
import { prismaAsAny } from "../../testutil/prisma";
import { UnverifiedSightingService } from "../unverifiedSighting";


describe("UnverifiedSightingService", () => {
    describe("getAllUnverifiedSightings", () => {
        it("should return full list of unverified sightings", async () => {
            prismaAsAny.unverified_sightings = {
                findMany: jest.fn().mockReturnValue([unverifiedSightingsModel]),
            };
            const result = await UnverifiedSightingService.getAllUnverifiedSightings();
            console.log(result);
            expect(result[0].userId).toEqual(unverifiedSightingsModel.user_id);
        });
    });


    describe("getSightingsByOrganismId", () => {
        it ("should return all sightings of an organism by id", async () => {
            prismaAsAny.unverified_sightings = {
                findMany: jest.fn().mockReturnValueOnce([unverifiedSightingsModel]),
            };
            const result = await UnverifiedSightingService.getSightingsByOrganismId(1);
            expect(result[0].lat).toEqual(unverifiedSightingsModel.lat);
        });

    });

    describe("getSightingsByUserId", () => {
        it ("should return all sightings of by a user by id", async () => {
            prismaAsAny.unverified_sightings = {
                findMany: jest.fn().mockReturnValueOnce([unverifiedSightingsModel]),
            };
            const result = await UnverifiedSightingService.getSightingsByUserId(1);
            expect(result[0].userId).toEqual(unverifiedSightingsModel.user_id);
        });
    });

    describe("createUnverifiedSighting", () => {
        it ("should add an unverified sighting to the database", () => {

            //test

            //fail if 

        })

 });

})

const unverifiedSightingsModel: unverified_sightings = {
    id: 5,
    organism_id: 1,
    user_id: 1,
    picture_url: "apicture.jpg",
    date: new Date("2000-10-01"),
    lat: new Prisma.Decimal(54.0000),
    long: new Prisma.Decimal(-7.0000),
    user_vote_id: 1,
    reaction_id: 1
    
}