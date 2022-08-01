import { Decimal } from "@prisma/client/runtime";
import { ConfirmedSighting } from "../../interfaces/confirmedSighting";
import { prismaAsAny } from "../../testutil/prisma";
import { confirmed_sightings } from "@prisma/client";
import { ConfirmedSightingService } from "../confirmedSighting";

jest.mock('@prisma/client');
jest.mock('../../utils/prisma');

describe("ConfirmedSightingService", () => {
    describe("getAllConfirmedSightings", () => {
        it("should return full list of confirmed sightings", async () => {
            prismaAsAny.confirmed_sightings = {
                findMany: jest.fn().mockReturnValue([confirmedSightingsModel]),
            };
            const result = await ConfirmedSightingService.getAllConfirmedSightings();
            expect(result[0].userId).toEqual(confirmedSightingsModel.user_id);
        });
    });


    describe("getSightingsByOrganismId", () => {
        it ("should return all sightings of an organism by id", async () => {
            prismaAsAny.confirmed_sightings = {
                findMany: jest.fn().mockReturnValueOnce([confirmedSightingsModel]),
            };
            const result = await ConfirmedSightingService.getSightingsByOrganismId(1);
            expect(result[0].lat).toEqual(confirmedSightingsModel.lat);
        });

    });

    describe("getSightingsByUserId", () => {
        it ("should return all sightings of by a user by id", async () => {
            prismaAsAny.confirmed_sightings = {
                findMany: jest.fn().mockReturnValueOnce([confirmedSightingsModel]),
            };
            const result = await ConfirmedSightingService.getSightingsByUserId(1);
            expect(result[0].userId).toEqual(confirmedSightingsModel.user_id);
        });
    });

    describe("createConfirmedSighting", () => {

        it("should create a new sighting", async () => {
            const prismaObjectSighting = {
                organism_id: 1,
                user_id: 1,
                picture_url: "test",
                date: "2000-01-01",
                lat: 54.0101,
                long: -7.0101
            }

            const interfaceObjectSighting : ConfirmedSighting = {
                sightingId: 6,
                organismId: 1,
                userId: 1,
                pictureURL: "2000-01-01",
                date: "2000-01-01",
                lat: 54.0101,
                long: -7.0101
            }

            prismaAsAny.confirmed_sightings = {
                create: jest.fn().mockResolvedValueOnce(prismaObjectSighting),
            }
           
            const final = await ConfirmedSightingService.createConfirmedSighting(interfaceObjectSighting);
            
            expect(final.user_id).toEqual(prismaObjectSighting.user_id);
    });
    })

 describe("deleteSightingById", () => {
    it("should delete a sighting using the id", async () => {
        prismaAsAny.confirmed_sightings = {
            delete: jest.fn().mockReturnValueOnce("Success"),
        };

        const mock = await ConfirmedSightingService.deleteConfirmedSightingById(5);

        expect(mock).toEqual("Success");
    });

});

})

const confirmedSightingsModel: confirmed_sightings = {
    id: 5,
    organism_id: 1,
    user_id: 1,
    picture_url: "apicture.jpg",
    date: new Date("2000-10-01"),
    lat: new Decimal(54.1212),
    long: new Decimal(-7.3434)
    
}