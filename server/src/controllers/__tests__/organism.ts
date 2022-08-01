import { Response } from "express";
import { OrganismController } from "../organism";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { OrganismService } from "../../services/organism";
import { CreateOrganism, Organism } from "../../interfaces/organism";
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
            const getOrganismByNameJsonBody = { taxonName: "test" }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getOrganismByName",
                body: getOrganismByNameJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(OrganismService.getOrganismByName).calledWith("test").mockResolvedValueOnce(interfaceObjectOrganism);

            await OrganismController.getOrganismByName(request, response);
            const responsedata: Organism = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.taxonName).toEqual(interfaceObjectOrganism.taxonName);
        })
    });

    describe("getOrganismByTaxonGroupId", () => {
        it("should return all organisms with the same taxon group id", async () => {
            const getOrganismByTaxonGroupIdJsonBody = { taxonGroupId: 2 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getOrganismByTaxonGroupId",
                body: getOrganismByTaxonGroupIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(OrganismService.getOrganismByTaxonGroupId).calledWith(2).mockResolvedValueOnce([interfaceObjectOrganism]);

            await OrganismController.getOrganismByTaxonGroupId(request, response);
            const responsedata: Organism = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.taxonName).toEqual(interfaceObjectOrganism.taxonName);
        })
    });

    describe("createOrganism", () => {
        it("should return a created organism", async () => {
            const createOrganismJsonBody = {
                taxonName: "test",
                latinName: "test",
                taxonGroupId: 1,
                pictureURL: "test.jpg",
                description: "testing organism controllers"
            }
            const request = httpMocks.createRequest({
                method: "POST",
                url: "/createOrganism",
                body: createOrganismJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(OrganismService.createOrganism).calledWith(createOrganismJsonBody).mockResolvedValueOnce(interfaceCreateOrganism);

            await OrganismController.createOrganism(request, response);
            const responsedata: Organism = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.latinName).toEqual(interfaceCreateOrganism.latinName);
        })
    });

    describe("updateOrganism", () => {
        it("should return an updated organism", async () => {
            const updateOrganismJsonBody = {
                organismId: 15,
                taxonName: "updated organism",
                description: "updated",
                pictureURL: "updatedorganism.jpg"
            }
            const request = httpMocks.createRequest({
                method: "PUT",
                url: "/updateOrganism",
                body: updateOrganismJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(OrganismService.updateOrganism).calledWith(updateOrganismJsonBody).mockResolvedValueOnce(interfaceObjectOrganism);

            await OrganismController.updateOrganism(request, response);
            const responsedata: Organism = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.taxonName).toEqual(interfaceObjectOrganism.taxonName);
        })
    });

    describe("deleteOrganismById", () => {
        it("should delete an organism using the id", async () => {
            const deleteOrganismByIdJsonBody = { organismId: 15 }
            const request = httpMocks.createRequest({
                method: "DELETE",
                url: "/deleteOrganismById",
                body: deleteOrganismByIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(OrganismService.deleteOrganismById).calledWith(15).mockResolvedValueOnce(interfaceObjectOrganism);

            await OrganismController.deleteOrganismById(request, response);
            const responsedata : Organism = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.organismId).toEqual(interfaceObjectOrganism.organismId);
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

const interfaceCreateOrganism: CreateOrganism = {

    taxonName: "test",
    latinName: "test",
    taxonGroupId: 1,
    pictureURL: "test.jpg",
    description: "testing organism controllers"
}