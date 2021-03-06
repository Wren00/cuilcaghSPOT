jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { organisms, prisma } from "@prisma/client";
import { CreateOrganism, Organism } from "../../interfaces/organism"
import { prismaAsAny } from "../../testutil/prisma";
import { OrganismService } from "../organism";


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
        it("should return a null if id is not valid", async () => {
            prismaAsAny.organisms = {
                delete: jest.fn().mockReturnValueOnce(null),
            };
            const result = await OrganismService.deleteOrganismById(50);

            expect(result).toEqual(null);
        });
        });

    });

    describe("createOrganism", () => {

        it("should create a new organism", async () => {
            const prismaObjectOrganism = {
                taxon_name: "newentry",
                latin_name: "newentry",
                taxon_group_id: 2,
                picture_url: "apicture",
                description: "a new organism for testing"
            }

            const interfaceObjectOrganism : CreateOrganism  = {
                taxonName: "newentry",
                latinName: "newentry",
                taxonGroupId: 2,
                pictureURL: "apicture",
                description: "a new organism for testing"
            }

            prismaAsAny.organisms = {
                create: jest.fn().mockResolvedValueOnce(prismaObjectOrganism),
            }
           
            const final = await OrganismService.createOrganism(interfaceObjectOrganism);
            
            expect(final.taxon_name).toEqual(prismaObjectOrganism.taxon_name);
        })
    });

    describe("updateOrganism", () => {

        it("should update an organism", async () => {
            const prismaObjectOrganism = {
                id: 15,
                taxon_name: "newentry",
                latin_name: "newentry",
                taxon_group_id: 2,
                picture_url: "anewpicture",
                description: "an organism"
            }

            const interfaceObjectOrganism : Organism  = {
                organismId: 15,
                taxonName: "anupdate",
                latinName: "newentry",
                taxonGroupId: 2,
                pictureURL: "apicture.jpg",
                description: "an updated organism"
            }

            prismaAsAny.organisms = {
                update: jest.fn().mockResolvedValueOnce(prismaObjectOrganism),
            }
           
            const final = await OrganismService.updateOrganism(interfaceObjectOrganism);

            expect(final.taxon_name).toEqual(prismaObjectOrganism.taxon_name);
        })
    });

    describe("deleteOrganismById", () => {
        it("should delete an organism using the id", async () => {
            prismaAsAny.organisms = {
                delete: jest.fn().mockReturnValueOnce(organismModel),
            };
            const result = await OrganismService.deleteOrganismById(10);

            expect(result.id).toEqual(organismModel.id);
        });
        it("should return null when delete unsuccessful", async () => {
            prismaAsAny.organisms = {
                delete: jest.fn().mockReturnValueOnce(null),
            };
            const result = await OrganismService.deleteOrganismById(10);

            expect(result).toEqual(null);
        });
        it("should return null when exception thrown", async () => {
            prismaAsAny.organisms = {
                delete: jest.fn().mockImplementationOnce( () => {
                    throw new Error("error");
                })
            };
            const result = await OrganismService.deleteOrganismById(10);

            expect(result).toEqual(null);
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