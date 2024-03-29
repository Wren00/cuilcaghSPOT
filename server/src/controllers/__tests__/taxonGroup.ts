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
        url: "/getAllTaxonGroups",
      });
      const response: MockResponse<Response> = createResponse();

      when(TaxonGroupService.getAllTaxonGroups).calledWith().mockResolvedValueOnce([interfaceObjectGroup]);

      await TaxonGroupController.getAllTaxonGroups(request, response);
      const responseData: TaxonGroup = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.taxonGroupName).toEqual(interfaceObjectGroup.taxonGroupName);
    });
  });

  describe("getTaxonGroupByName", () => {
    it("should return a taxon group by it's name", async () => {
      const getTaxonByNameJsonBody = { taxonGroupName: "test taxon group" };
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getTaxonGroupByName",
        body: getTaxonByNameJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(TaxonGroupService.getTaxonGroupByName)
        .calledWith("test taxon group")
        .mockResolvedValueOnce([interfaceObjectGroup]);

      await TaxonGroupController.getTaxonGroupByName(request, response);
      const responseData: TaxonGroup = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.taxonGroupName).toEqual(interfaceObjectGroup.taxonGroupName);
    });
  });

  describe("getTaxonGroupById", () => {
    it("should return a taxon group by the id", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getTaxonGroupById/",
        params: { id: 2 },
      });
      const response: MockResponse<Response> = createResponse();

      when(TaxonGroupService.getTaxonGroupById).calledWith(2).mockResolvedValueOnce(interfaceObjectGroup);

      await TaxonGroupController.getTaxonGroupById(request, response);
      const responseData: TaxonGroup = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.taxonId).toEqual(interfaceObjectGroup.taxonId);
    });
  });

  describe("createTaxonGroup", () => {
    it("should return a created taxon group", async () => {
      const createTaxonGroupJsonBody = {
        taxonId: 2,
        taxonGroupName: "test taxon group",
        description: "a test taxon group",
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/createTaxonGroup",
        body: createTaxonGroupJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(TaxonGroupService.createTaxonGroup)
        .calledWith(createTaxonGroupJsonBody)
        .mockResolvedValueOnce(interfaceObjectGroup);

      await TaxonGroupController.createTaxonGroup(request, response);
      const responseData: TaxonGroup = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.taxonGroupName).toEqual(interfaceObjectGroup.taxonGroupName);
    });
  });

  describe("deleteByTaxonGroupId", () => {
    it("should delete a taxon group using the id", async () => {
      const deleteTaxonGroupJsonBody = { taxonId: 2 };
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/deleteTaxonGroupById",
        body: deleteTaxonGroupJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(TaxonGroupService.deleteTaxonGroupById).calledWith(2).mockResolvedValueOnce(interfaceObjectGroup);

      await TaxonGroupController.deleteTaxonGroupById(request, response);
      const responseData: TaxonGroup = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.taxonId).toEqual(interfaceObjectGroup.taxonId);
    });
  });
});

const interfaceObjectGroup: TaxonGroup = {
  taxonId: 2,
  taxonGroupName: "test taxon group",
  description: "a test taxon group",
};
