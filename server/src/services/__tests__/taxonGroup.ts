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
        it ("should insert a taxon group entry to database", () => {

            //test

            //fail if taxonGroupName is not entered
            //fail if level of editing user not admin

        });

    });

    describe("deleteTaxonGroupById", () => {
        it ("should remove a taxon group entry in database", () => {

            //test

            //fail if id is invalid
            //fail if editing user not admin

        });

    });

});

const taxonGroupModel: taxon_groups = {
    id: 10,
    taxon_group_name: "animal",
    description: "a group of animals"
};