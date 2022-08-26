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
        url: "/getAllUnverifiedSightings",
      });
      const response: MockResponse<Response> = createResponse();

      when(UnverifiedSightingService.getAllUnverifiedSightings)
        .calledWith()
        .mockResolvedValueOnce([interfaceObjectSighting]);

      await UnverifiedSightingController.getAllUnverifiedSightings(request, response);
      const responseData: UnverifiedSighting = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("getSightingsByUserId", () => {
    it("should return all unverified sightings made by a user", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getSightingsByUserId/",
        params: { id: 1 },
      });
      const response: MockResponse<Response> = createResponse();

      when(UnverifiedSightingService.getSightingsByUserId)
        .calledWith(1)
        .mockResolvedValueOnce([interfaceObjectSighting]);

      await UnverifiedSightingController.getSightingsByUserId(request, response);
      const responseData: UnverifiedSighting = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.userId).toEqual(interfaceObjectSighting.userId);
    });
  });

  describe("getSightingsByOrganismId", () => {
    it("should return all sightings of an organism by id", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getSightingsByOrganismId/",
        params: { id: 3 },
      });
      const response: MockResponse<Response> = createResponse();

      when(UnverifiedSightingService.getSightingsByOrganismId)
        .calledWith(3)
        .mockResolvedValueOnce([interfaceObjectSighting]);

      await UnverifiedSightingController.getSightingsByOrganismId(request, response);
      const responseData: UnverifiedSighting = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("createUnverifiedSighting", () => {
    it("should return a created unverified sighting", async () => {
      const createSightingJsonBody = {
        sightingId: 1,
        organismId: 3,
        userId: 1,
        pictureUrl: "testAnimal.jpg",
        date: "2000-01-01",
        lat: 99.9999,
        long: -7.7777,
        userVotes: 2
      };
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/createUnverifiedSighting",
        body: createSightingJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UnverifiedSightingService.createUnverifiedSighting)
        .calledWith(createSightingJsonBody)
        .mockResolvedValueOnce(interfaceObjectSighting);

      await UnverifiedSightingController.createUnverifiedSighting(request, response);
      const responseData: UnverifiedSighting = response._getJSONData();
      expect(response._getStatusCode()).toEqual(201);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("updateUnverifiedSighting", () => {
    it("should return an updated unverified sighting", async () => {
      const updateSightingJsonBody : UnverifiedSighting = {
        sightingId: 1,
        organismId: 4,
        userId: 1,
        pictureUrl: "testAnimal.jpg",
        date: new Date("2000-01-01"),
        lat: 99.9999,
        long: -7.7777,
        userVotes: 2,
        organismName: "Red Fox",
        userName: "test"
      };
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/updateUnverifiedSighting",
        body: updateSightingJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UnverifiedSightingService.updateSighting)
        .calledWith(updateSightingJsonBody)
        .mockResolvedValueOnce(interfaceObjectSighting);

      await UnverifiedSightingController.updateSighting(request, response);
      const responseData: UnverifiedSighting = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("deleteUnverifiedSightingById", () => {
    it("should delete an unverified sighting using the id", async () => {
      const deleteSightingByIdJsonBody = { sightingId: 15 };
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/deleteUnverifiedSightingById",
        body: deleteSightingByIdJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UnverifiedSightingService.deleteUnverifiedSightingById)
        .calledWith(15)
        .mockResolvedValueOnce(interfaceObjectSighting);

      await UnverifiedSightingController.deleteUnverifiedSightingById(request, response);
      const responseData: UnverifiedSighting = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.sightingId).toEqual(interfaceObjectSighting.sightingId);
    });
  });
});

const interfaceObjectSighting: UnverifiedSighting = {
  sightingId: 1,
  organismId: 3,
  userId: 1,
  pictureUrl: "testAnimal.jpg",
  date: new Date("2000-01-01"),
  lat: 99.9999,
  long: -7.7777,
  userVotes: 2,
  organismName: "Red Fox",
  userName: "test",
};
