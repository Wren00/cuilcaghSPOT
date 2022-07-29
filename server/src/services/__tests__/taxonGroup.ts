jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { interest_groups, taxon_groups } from "@prisma/client";
import { TaxonGroupController } from "../../controllers/taxonGroup";
import { TaxonGroup } from "../../interfaces/taxonGroup";
import { prismaAsAny } from "../../testutil/prisma";
import { TaxonGroupService } from "../taxonGroup";

describe("TaxonGroupService", () => {

    describe("getAllTaxonGroups", () => {
        it("should return full list of taxon groups", async () => {
            prismaAsAny.taxon_groups = {
                findMany: jest.fn().mockReturnValueOnce([taxonGroupModel]),
            };
            const result = await TaxonGroupService.getAllTaxonGroups();
            expect(result[0].taxonGroupName).toEqual(taxonGroupModel.taxon_group_name);
        });
    });

    describe("getTaxonGroupById", () => {
        it("should return a taxon group using id", async () => {
            prismaAsAny.taxon_groups = {
                findUnique: jest.fn().mockReturnValueOnce(taxonGroupModel),
            };
            const result = await TaxonGroupService.getTaxonGroupById(10);
            expect(result.taxonGroupId).toEqual(taxonGroupModel.id);
        });
        //     it("should throw an error if an id is not valid", async () => {
        //         prismaAsAny.taxon_groups = {
        //             findUnique: jest.fn().mockImplementation(() => 
        //             {
        //                 throw new Error("Cannot find id");
        //             }),
        //         };
        //         const result = await TaxonGroupService.getTaxonGroupById(50);
        //         expect(result.toString()).toEqual("fail");

        //     });
    });


    describe("getTaxonGroupByName", () => {
        it("should return a taxon group", async () => {
            prismaAsAny.taxon_groups = {
                findMany: jest.fn().mockReturnValueOnce([taxonGroupModel]),
            };
            const result = await TaxonGroupService.getTaxonGroupByName("animal");
            console.log(result);
            expect(result[0].taxonGroupName).toEqual(taxonGroupModel.taxon_group_name);
        });
        // it("should return an error message if a name is not valid", async () => {
        //     prismaAsAny.taxon_groups = {
        //         delete: jest.fn().mockReturnValueOnce(taxonGroupModel),
        //     };
        //     const result = await TaxonGroupService.getTaxonGroupByName("fail");

        //     expect(result).toEqual("Cannot find name");
        // });


    });

    describe("createTaxonGroup", () => {

        it("should create a new taxon group", async () => {
            const prismaObjectGroup = taxonGroupModel;

            const interfaceObjectGroup: TaxonGroup = {
                taxonId: 10,
                taxonGroupName: "animal",
                description: "a group of animals"
            }

            prismaAsAny.taxon_groups = {
                create: jest.fn().mockResolvedValueOnce(prismaObjectGroup),
            }

            const final = await TaxonGroupService.createTaxonGroup(interfaceObjectGroup);

            expect(final).toEqual(taxonGroupModel);
        })
    });

    describe("deleteTaxonGroupById", () => {
        it("should delete a sighting using the id", async () => {
            prismaAsAny.taxon_groups = {
                delete: jest.fn().mockReturnValueOnce(taxonGroupModel),
            };

            const mock = await TaxonGroupService.deleteTaxonGroupById(10);

            expect(mock).toEqual(taxonGroupModel);
        });

    });

})

const taxonGroupModel: taxon_groups = {
    id: 10,
    taxon_group_name: "animal",
    description: "a group of animals"
};