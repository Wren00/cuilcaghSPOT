import { Response } from "express";
import { UserGroupController } from "../userGroup";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { UserGroupService } from "../../services/userGroup";
import { UserGroup } from "../../interfaces/userGroup";
jest.mock("../../services/userGroup.ts");

describe("UserGroupController", () => {
    describe("getAllUserGroups", () => {
        it("should return all user groups", async () => {
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getAllUserGroups"
            })
            const response: MockResponse<Response> = createResponse();

            when(UserGroupService.getAllUserGroups).calledWith().mockResolvedValueOnce([interfaceObjectGroup]);

            await UserGroupController.getAllUserGroups(request, response);
            const responsedata: UserGroup = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.groupName).toEqual(interfaceObjectGroup.groupName);
        })
    });

    describe("getUserGroupById", () => {
        it("should return an user group by the id", async () => {
            const getUserGroupByIdJsonBody = { groupId: 1 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getUserGroupById",
                body: getUserGroupByIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserGroupService.getUserGroupById).calledWith(1).mockResolvedValueOnce(interfaceObjectGroup);

            await UserGroupController.getUserGroupById(request, response);
            const responsedata: UserGroup = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.groupId).toEqual(interfaceObjectGroup.groupId);
        })
    });

    describe("getUserGroupByName", () => {
        it("should return a user groups by the name", async () => {
            const getUserGroupByNameJsonBody = { groupName: "test"}
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getUserGroupByName",
                body: getUserGroupByNameJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserGroupService.getUserGroupByName).calledWith("test").mockResolvedValueOnce([interfaceObjectGroup]);

            await UserGroupController.getUserGroupByName(request, response);
            const responsedata: UserGroup = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.groupName).toEqual(interfaceObjectGroup.groupName);
        })
    });

})

const interfaceObjectGroup: UserGroup = {
    groupId: 1,
    groupName: "test",
    description: "test"
}