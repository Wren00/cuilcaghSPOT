jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { organisms } from "@prisma/client";
import { request } from "express";
import { prismaAsAny } from "../../testutil/prisma";
import { OrganismService } from "../organism";
import { app } from "./../../../app"


describe("OrganismService", () => {
    describe("getAllOrganisms", () => {
        it("should return full list of organisms", async () => {
            prismaAsAny.organisms = {
                findMany: jest.fn().mockReturnValue([organismModel]),
            };
            const result = await OrganismService.getAllOrganisms();
            expect(result[0].latinName).toEqual(organismModel.latin_name);
        });
    });

    describe("getOrganismById", () => {
        it("should return an organism", async () => {
            prismaAsAny.organisms = {
                findUnique: jest.fn().mockReturnValueOnce(organismModel),
            };
            const result = await OrganismService.getOrganismById(10);
            expect(result.latinName).toEqual(organismModel.latin_name);
        });

    });

    describe("getOrganismByName", () => {
        it("should return an organism", async () => {
            prismaAsAny.organisms = {
                findMany: jest.fn().mockReturnValue([organismModel]),
            };
            const result = await OrganismService.getOrganismByName("an animal");
            expect(result[0].taxonName).toEqual(organismModel.taxon_name);
        });

    });

    describe("getOrganismByTaxonGroupId", () => {
        it("should return all organisms within a taxon group", async () => {
            prismaAsAny.organisms = {
                findMany: jest.fn().mockReturnValueOnce([organismModel]),
            };
            const result = await OrganismService.getOrganismByTaxonGroupId(3);
            expect(result[0].latinName).toEqual(organismModel.latin_name);
        });

    });

    describe("deleteOrganismById", () => {
        it("should delete an organism by id", async () => {
            const result = await OrganismService.deleteOrganismById(10);
            expect(result).toHaveBeenCalledTimes(1);
        });

    });
        
})



const organismModel: organisms = {
    id: 10,
    taxon_name: "an animal",
    latin_name: "animalia",
    taxon_group_id: 1,
    picture_url: "animal.jpg",
    description: "about this animal"
}