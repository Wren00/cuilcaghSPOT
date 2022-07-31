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

    describe("createUserGroup", () => {
        it("should return a created user group", async () => {
            const createGroupJsonBody = {
                groupId: 2,
                groupName: "test2",
                description: "test2"
            }
            const request = httpMocks.createRequest({
                method: "POST",
                url: "/createUserGroup",
                body: createGroupJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserGroupService.createUserGroup).calledWith(createGroupJsonBody).mockResolvedValueOnce(interfaceCreateGroup);

            await UserGroupController.createUserGroup(request, response);
            const responsedata: UserGroup = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.groupName).toEqual(interfaceCreateGroup.groupName);
        })
    });

    describe("updateUserGroup", () => {
        it("should return an updated user group", async () => {
            const updateGroupJsonBody = {
                groupId: 1,
                groupName: "update test",
                description: "update test"
            }
            const request = httpMocks.createRequest({
                method: "PUT",
                url: "/updateUserGroup",
                body: updateGroupJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserGroupService.updateUserGroup).calledWith(updateGroupJsonBody).mockResolvedValueOnce(interfaceObjectGroup);

            await UserGroupController.updateUserGroup(request, response);
            const responsedata: UserGroup = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.groupName).toEqual(interfaceObjectGroup.groupName);
        })
    });

    describe("deleteUserGroupById", () => {
        it("should delete a user group using the id", async () => {
            const deleteGroupByIdJsonBody = { groupId: 1 }
            const request = httpMocks.createRequest({
                method: "DELETE",
                url: "/deleteUserGroupById",
                body: deleteGroupByIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserGroupService.deleteUserGroupById).calledWith(1).mockResolvedValueOnce(interfaceObjectGroup);

            await UserGroupController.deleteUserGroupById(request, response);
            const responsedata : UserGroup = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.groupId).toEqual(interfaceObjectGroup.groupId);
        })
    });

})

const interfaceObjectGroup: UserGroup = {
    groupId: 1,
    groupName: "test",
    description: "test"
}

const interfaceCreateGroup: UserGroup = {
    groupId: 2,
    groupName: "test2",
    description: "test2"
}