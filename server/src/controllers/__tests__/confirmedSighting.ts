import { Response } from "express";
import { ConfirmedSightingController } from "../confirmedSighting";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { ConfirmedSighting } from "../../interfaces/confirmedSighting"
import { ConfirmedSightingService } from "../../services/confirmedSighting";
jest.mock("../../services/confirmedSighting.ts");

describe("ConfirmedSightingController", () => {
    describe("getAllConfirmedSightings", () => {
        it("should return all confirmed sightings", async () => {
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getAllConfirmedSightings"
            })
            const response: MockResponse<Response> = createResponse();

            when(ConfirmedSightingService.getAllConfirmedSightings).calledWith().mockResolvedValueOnce([interfaceObjectSighting]);

            await ConfirmedSightingController.getAllConfirmedSightings(request, response);
            const responsedata: ConfirmedSighting = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.organismId).toEqual(interfaceObjectSighting.organismId);
        })
    });

    describe("getSightingsByUserId", () => {
        it("should return all confirmed sightings made by a user", async () => {
            const getSightingsByUserIdJsonBody = { userId: 1 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getSightingsByUserId",
                body: getSightingsByUserIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(ConfirmedSightingService.getSightingsByUserId).calledWith(1).mockResolvedValueOnce([interfaceObjectSighting]);

            await ConfirmedSightingController.getSightingsByUserId(request, response);
            const responsedata: ConfirmedSighting = response._getJSONData()[0];
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

            when(ConfirmedSightingService.getSightingsByOrganismId).calledWith(3).mockResolvedValueOnce([interfaceObjectSighting]);

            await ConfirmedSightingController.getSightingsByOrganismId(request, response);
            const responsedata: ConfirmedSighting = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.organismId).toEqual(interfaceObjectSighting.organismId);
        })
    });
})

const interfaceObjectSighting: ConfirmedSighting = {
    organismId: 3,
    userId: 1,
    pictureURL: "testanimal.jpg",
    date: "2000-01-01",
    lat: 99.9999,
    long: -7.7777
}