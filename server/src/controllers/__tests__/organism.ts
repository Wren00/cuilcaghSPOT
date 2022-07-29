import { Response } from "express";
import { OrganismController } from "../organism";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { OrganismService } from "../../services/organism";
import { Organism } from "../../interfaces/organism";
jest.mock("../../services/organism.ts");

describe("OrganismController", () => {
    describe("getAllOrganisms", () => {
        it("should return all organisms", async () => {
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getAllOrganisms"
            })
            const response: MockResponse<Response> = createResponse();

            when(OrganismService.getAllOrganisms).calledWith().mockResolvedValueOnce([interfaceObjectOrganism]);

            await OrganismController.getAllOrganisms(request, response);
            const responsedata: Organism = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.latinName).toEqual(interfaceObjectOrganism.latinName);
        })
    });

        describe("getOrganismById", () => {
            it("should return an organism by the id", async () => {
                const getOrganismByIdJsonBody = { organismId: 15 }
                const request = httpMocks.createRequest({
                    method: "GET",
                    url: "/getOrganismById",
                    body: getOrganismByIdJsonBody
                })
                const response: MockResponse<Response> = createResponse();

                when(OrganismService.getOrganismById).calledWith(15).mockResolvedValueOnce(interfaceObjectOrganism);

                await OrganismController.getOrganismById(request, response);
                const responsedata: Organism = response._getJSONData();
                expect(response._getStatusCode()).toEqual(200);
                expect(responsedata.organismId).toEqual(interfaceObjectOrganism.organismId);
            })
        });

        describe("getOrganismByName", () => {
            it("should return an organism by the name", async () => {
                const getOrganismByNameJsonBody = {taxonName : "test"}
                const request = httpMocks.createRequest({
                    method: "GET",
                    url: "/getOrganismByName",
                    body: getOrganismByNameJsonBody
                })
                const response: MockResponse<Response> = createResponse();
    
                when(OrganismService.getOrganismByName).calledWith("test").mockResolvedValueOnce(interfaceObjectOrganism);
    
                await OrganismController.getOrganismByName(request, response);
                const responsedata : Organism = response._getJSONData();
                expect(response._getStatusCode()).toEqual(200);
                expect(responsedata.taxonName).toEqual(interfaceObjectOrganism.taxonName);
            })
        });

        describe("getOrganismByTaxonGroupId", () => {
            it("should return all organisms with the same taxon group id", async () => {
                const getOrganismByTaxonGroupIdJsonBody = {taxonGroupId : 2}
                const request = httpMocks.createRequest({
                    method: "GET",
                    url: "/getOrganismByTaxonGroupId",
                    body: getOrganismByTaxonGroupIdJsonBody
                })
                const response: MockResponse<Response> = createResponse();
    
                when(OrganismService.getOrganismByTaxonGroupId).calledWith(2).mockResolvedValueOnce([interfaceObjectOrganism]);
    
                await OrganismController.getOrganismByTaxonGroupId(request, response);
                const responsedata : Organism = response._getJSONData()[0];
                expect(response._getStatusCode()).toEqual(200);
                expect(responsedata.taxonName).toEqual(interfaceObjectOrganism.taxonName);
            })
        });

})

const interfaceObjectOrganism: Organism = {
    organismId: 15,
    taxonName: "test",
    latinName: "test",
    taxonGroupId: 2,
    pictureURL: "apicture.jpg",
    description: "an organism"
}