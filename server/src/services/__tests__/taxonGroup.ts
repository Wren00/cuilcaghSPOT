jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { interest_groups, taxon_groups } from "@prisma/client";
import { TaxonGroup } from "../../interfaces/taxonGroup";
import { prismaAsAny } from "../../testutil/prisma";
import { TaxonGroupService } from "../taxonGroup";

describe ("TaxonGroupService", () => {

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
        it("should return an organism based on taxon group", async () => {
            prismaAsAny.taxon_groups = {
                findUnique: jest.fn().mockReturnValueOnce(taxonGroupModel),
            };
            const result = await TaxonGroupService.getTaxonGroupById(10);
            expect(result.taxonGroupName).toEqual(taxonGroupModel.taxon_group_name);
        });

    });

        describe("getTaxonGroupByName", () => {
            it("should return a taxon group", async () => {
                prismaAsAny.taxon_groups = {
                    findMany: jest.fn().mockReturnValueOnce([taxonGroupModel]),
                };
                const result = await TaxonGroupService.getTaxonGroupByName("animal");
                expect(result[0].taxonGroupName).toEqual(taxonGroupModel.taxon_group_name);
            });
    
        });

    describe("createTaxonGroup", () => {

        it("should create a new taxon group", async () => {
            const prismaObjectGroup = taxonGroupModel;

            const interfaceObjectGroup : TaxonGroup = {
                taxonGroupName: "animal",
                description: "a group of animals"
            }

            prismaAsAny.taxon_groups = {
                create: jest.fn().mockResolvedValueOnce(prismaObjectGroup),
            }
           
            const final = await TaxonGroupService.createTaxonGroup(interfaceObjectGroup);
            
            expect(final).toEqual("Success");
        })
    });

 describe("deleteTaxonGroupById", () => {
    it("should delete a sighting using the id", async () => {
        prismaAsAny.taxon_groups = {
            delete: jest.fn().mockReturnValueOnce("Success"),
        };

        const mock = await TaxonGroupService.deleteTaxonGroupById(10);

        expect(mock).toEqual("Success");
    });

});

});

const taxonGroupModel: taxon_groups = {
    id: 10,
    taxon_group_name: "animal",
    description: "a group of animals"
};