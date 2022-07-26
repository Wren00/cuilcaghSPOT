jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { Prisma, confirmed_sightings } from "@prisma/client";
import { prismaAsAny } from "../../testutil/prisma";
import { ConfirmedSightingService } from "../confirmedSighting";

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

})

const confirmedSightingsModel: confirmed_sightings = {
    id: 5,
    organism_id: 1,
    user_id: 1,
    picture_url: "apicture.jpg",
    date: new Date("2000-10-01"),
    lat: new Prisma.Decimal(54.0000),
    long: new Prisma.Decimal(-7.0000)
    
}