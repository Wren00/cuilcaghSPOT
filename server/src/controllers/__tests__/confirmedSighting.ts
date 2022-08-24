import { Response } from "express";
import { ConfirmedSightingController } from "../confirmedSighting";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { ConfirmedSighting } from "../../interfaces/confirmedSighting";
import { ConfirmedSightingService } from "../../services/confirmedSighting";
jest.mock("../../services/confirmedSighting.ts");

describe("ConfirmedSightingController", () => {
  describe("getAllConfirmedSightings", () => {
    it("should return all confirmed sightings", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getAllConfirmedSightings",
      });
      const response: MockResponse<Response> = createResponse();

      when(ConfirmedSightingService.getAllConfirmedSightings)
        .calledWith()
        .mockResolvedValueOnce([interfaceObjectSighting]);

      await ConfirmedSightingController.getAllConfirmedSightings(request, response);
      const responseData: ConfirmedSighting = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("getSightingsByUserId", () => {
    it("should return all confirmed sightings made by a user", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getSightingsByUserId/",
        params: { id: 1 },
      });
      const response: MockResponse<Response> = createResponse();

      when(ConfirmedSightingService.getSightingsByUserId)
        .calledWith(1)
        .mockResolvedValueOnce([interfaceObjectSighting]);

      await ConfirmedSightingController.getSightingsByUserId(request, response);
      const responseData: ConfirmedSighting = response._getJSONData()[0];
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

      when(ConfirmedSightingService.getSightingsByOrganismId)
        .calledWith(3)
        .mockResolvedValueOnce([interfaceObjectSighting]);

      await ConfirmedSightingController.getSightingsByOrganismId(request, response);
      const responseData: ConfirmedSighting = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("createConfirmedSighting", () => {
    it("should return a created confirmed sighting", async () => {
      const createSightingJsonBody = {
        organismId: 3,
        userId: 1,
        pictureUrl: "testAnimal.jpg",
        date: "2000-01-01",
        lat: 99.9999,
        long: -7.7777,
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/createConfirmedSighting",
        body: createSightingJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(ConfirmedSightingService.createConfirmedSighting)
        .calledWith(createSightingJsonBody)
        .mockResolvedValueOnce(interfaceObjectSighting);

      await ConfirmedSightingController.createConfirmedSighting(request, response);
      const responseData: ConfirmedSighting = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("deleteConfirmedSightingById", () => {
    it("should delete a taxon group using the id", async () => {
      const deleteSightingJsonBody = { sightingId: 2 };
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/deleteConfirmedSightingById",
        body: deleteSightingJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(ConfirmedSightingService.deleteConfirmedSightingById)
        .calledWith(2)
        .mockResolvedValueOnce(interfaceObjectSighting);

      await ConfirmedSightingController.deleteSightingById(request, response);
      const responseData: ConfirmedSighting = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.organismId).toEqual(interfaceObjectSighting.organismId);
    });
  });
});

const interfaceObjectSighting: ConfirmedSighting = {
  organismName: "organism name",
  userName: "user name",
  sightingId: 2,
  organismId: 3,
  userId: 1,
  pictureUrl: "testAnimal.jpg",
  date: "2000-01-01",
  lat: 99.9999,
  long: -7.7777
};
