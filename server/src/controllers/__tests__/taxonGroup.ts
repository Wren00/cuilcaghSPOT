import { Response } from "express";
import { TaxonGroupController } from "../taxonGroup";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { TaxonGroupService } from "../../services/taxonGroup";
import { TaxonGroup } from "../../interfaces/taxonGroup";

jest.mock("../../services/taxonGroup.ts");

describe("TaxonGroupController", () => {

    describe("getAllTaxonGroups", () => {
        it("should return all taxon groups", async () => {
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getAllTaxonGroups"
            })
            const response: MockResponse<Response> = createResponse();

            when(TaxonGroupService.getAllTaxonGroups).calledWith().mockResolvedValueOnce([interfaceObjectGroup]);

            await TaxonGroupController.getAllTaxonGroups(request, response);
            const responsedata: TaxonGroup = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.taxonGroupName).toEqual(interfaceObjectGroup.taxonGroupName);
        })
    });

    describe("getTaxonGroupByName", () => {
        it("should return a taxon group by it's name", async () => {
            const getTaxonByNameJsonBody = { taxonGroupName : "test taxon group" } 
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getTaxonGroupByName",
                body: getTaxonByNameJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(TaxonGroupService.getTaxonGroupByName).calledWith("test taxon group").mockResolvedValueOnce([interfaceObjectGroup]);

            await TaxonGroupController.getTaxonGroupByName(request, response);
            const responsedata: TaxonGroup = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.taxonGroupName).toEqual(interfaceObjectGroup.taxonGroupName);
        })
    });

    
    describe("getTaxonGroupById", () => {
        it("should return a taxon group by the id", async () => {
            const getTaxonGroupByIdJsonBody = { taxonId: 2 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getTaxonGroupById",
                body: getTaxonGroupByIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(TaxonGroupService.getTaxonGroupById).calledWith(2).mockResolvedValueOnce(interfaceObjectGroup);

            await TaxonGroupController.getTaxonGroupById(request, response);
            const responsedata: TaxonGroup = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.taxonId).toEqual(interfaceObjectGroup.taxonId);
        })
    });
 

})

const interfaceObjectGroup: TaxonGroup= {
    taxonId: 2,
    taxonGroupName: "test taxon group",
    description: "a test taxon group"
}