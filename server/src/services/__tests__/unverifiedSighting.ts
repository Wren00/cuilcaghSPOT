jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { Prisma, unverified_sightings } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { UnverifiedSighting } from "../../interfaces/unverifiedSighting";
import { prismaAsAny } from "../../testutil/prisma";
import { UnverifiedSightingService } from "../unverifiedSighting";


describe("UnverifiedSightingService", () => {
    describe("getAllUnverifiedSightings", () => {
        it("should return full list of unverified sightings", async () => {
            prismaAsAny.unverified_sightings = {
                findMany: jest.fn().mockReturnValue([unverifiedSightingsModel]),
            };
            const result = await UnverifiedSightingService.getAllUnverifiedSightings();
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

        it("should create a new unverified sighting", async () => {
            const prismaObjectSighting = unverifiedSightingsModel;

            const interfaceObjectSighting : UnverifiedSighting = {
                organismId: 1,
                userId: 1,
                pictureURL: "apicture.jpg",
                date: "2000-10-01",
                lat: 54.0101,
                long: -7.2222,
                userVotes: 0,
                userReactions: 0,
                sightingId: 0
            }

            prismaAsAny.unverified_sightings = {
                create: jest.fn().mockResolvedValueOnce(prismaObjectSighting),
            }
           
            const final = await UnverifiedSightingService.createUnverifiedSighting(interfaceObjectSighting);
            
            expect(final).toEqual("Success");
        })
    });

 describe("deleteSightingById", () => {
    it("should delete a sighting using the id", async () => {
        prismaAsAny.unverified_sightings = {
            delete: jest.fn().mockReturnValueOnce("Success"),
        };

        const mock = await UnverifiedSightingService.deleteUnverifiedSightingById(5);

        expect(mock).toEqual("Success");
    });

});

})

const unverifiedSightingsModel: unverified_sightings = {
    id: 5,
    organism_id: 1,
    user_id: 1,
    picture_url: "apicture.jpg",
    date: new Date("2000-10-01"),
    lat: new Decimal(54.0101),
    long: new Decimal(-7.2222),
    user_vote_id: 1,
    reaction_id: 1
    
}