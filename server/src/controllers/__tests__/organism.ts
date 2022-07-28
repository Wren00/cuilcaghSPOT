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
            const responsedata : Organism = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.latinName).toEqual(interfaceObjectOrganism.latinName);
        })
    });
})

const interfaceObjectOrganism: Organism = {
    organismId: 15,
    taxonName: "anupdate",
    latinName: "newentry",
    taxonGroupId: 2,
    pictureURL: "apicture.jpg",
    description: "an updated organism"
}