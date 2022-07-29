import { Response } from "express";
import { UnverifiedSightingController } from "../unverifiedSighting";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { UnverifiedSighting } from "../../interfaces/unverifiedSighting";
import { UnverifiedSightingService } from "../../services/unverifiedSighting";


jest.mock("../../services/unverifiedSighting.ts");

describe("UnverifiedSightingController", () => {
    describe("getAllUnverifiedSightings", () => {
        it("should return all unverified sightings", async () => {
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getAllUnverifiedSightings"
            })
            const response: MockResponse<Response> = createResponse();

            when(UnverifiedSightingService.getAllUnverifiedSightings).calledWith().mockResolvedValueOnce([interfaceObjectSighting]);

            await UnverifiedSightingController.getAllUnverifiedSightings(request, response);
            const responsedata: UnverifiedSighting = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.organismId).toEqual(interfaceObjectSighting.organismId);
        })
    });

    describe("getSightingsByUserId", () => {
        it("should return all unverified sightings made by a user", async () => {
            const getSightingsByUserIdJsonBody = { userId: 1 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getSightingsByUserId",
                body: getSightingsByUserIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UnverifiedSightingService.getSightingsByUserId).calledWith(1).mockResolvedValueOnce([interfaceObjectSighting]);

            await UnverifiedSightingController.getSightingsByUserId(request, response);
            const responsedata: UnverifiedSighting = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.userId).toEqual(interfaceObjectSighting.userId);
        })
    });

    describe("getSightingsByOrganismId", () => {
        it("should return all sightings of an organism by id", async () => {
            const getSightingsByOrganismIdJsonBody = { organismId: 3 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getSightingsByOrganismId",
                body: getSightingsByOrganismIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UnverifiedSightingService.getSightingsByOrganismId).calledWith(3).mockResolvedValueOnce([interfaceObjectSighting]);

            await UnverifiedSightingController.getSightingsByOrganismId(request, response);
            const responsedata: UnverifiedSighting = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.organismId).toEqual(interfaceObjectSighting.organismId);
        })
    });
})

const interfaceObjectSighting: UnverifiedSighting = {

    sightingId: 1,
    organismId: 3,
    userId: 1,
    pictureURL: "testanimal.jpg",
    date: "2000-01-01",
    lat: 99.9999,
    long: -7.7777,
    userVotes: 2,
    userReactions: 2
}