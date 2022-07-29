import { Response } from "express";
import { UserController } from "../user";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { UserService } from "../../services/user";
import { User, CreateUser } from "../../interfaces/user";
import { users } from "@prisma/client";

jest.mock("../../services/user.ts");

describe("UserController", () => {
    describe("getAllUsers", () => {
        it("should return all users", async () => {
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getAllUsers"
            })
            const response: MockResponse<Response> = createResponse();

            when(UserService.getAllUsers).calledWith().mockResolvedValueOnce([interfaceObjectUser]);

            await UserController.getAllUsers(request, response);
            const responsedata: User = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.userName).toEqual(interfaceObjectUser.userName);
        })
    });

    describe("getUserById", () => {
        it("should return an user group by the id", async () => {
            const getUserByIdJsonBody = { userId: 1 }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getUserById",
                body: getUserByIdJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserService.getUserById).calledWith(1).mockResolvedValueOnce(interfaceObjectUser);

            await UserController.getUserById(request, response);
            const responsedata: User = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.userId).toEqual(interfaceObjectUser.userId);
        })
    });

    describe("getUserByName", () => {
        it("should return users by the name", async () => {
            const getUserByNameJsonBody = { userName: "test" }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getUserByName",
                body: getUserByNameJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserService.getUserByName).calledWith(getUserByNameJsonBody.userName).mockResolvedValueOnce([interfaceObjectUser]);

            await UserController.getUserByName(request, response);
            const responsedata: User = response._getJSONData()[0];
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.userName).toEqual(interfaceObjectUser.userName);
        })
    });

    describe("getUserByEmail", () => {
        it("should find a user with the email address", async () => {
            const getUserByEmailJsonBody = { emailAddress: "test@gmail.com" }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getUserByEmail",
                body: getUserByEmailJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserService.getUserByEmail).calledWith("test@gmail.com").mockResolvedValueOnce(interfaceObjectUser);

            await UserController.getUserByEmail(request, response);
            const responsedata: User = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.emailAddress).toEqual(interfaceObjectUser.emailAddress);
        })
    });

    describe("getUserBy", () => {
        it("should find a user with the email address", async () => {
            const getUserByEmailJsonBody = { emailAddress: "test@gmail.com" }
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/getUserByEmail",
                body: getUserByEmailJsonBody
            })
            const response: MockResponse<Response> = createResponse();

            when(UserService.getUserByEmail).calledWith("test@gmail.com").mockResolvedValueOnce(interfaceObjectUser);

            await UserController.getUserByEmail(request, response);
            const responsedata: User = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.emailAddress).toEqual(interfaceObjectUser.emailAddress);
        })
    });

    describe("createUser", () => {
        it("should create a user", async () => {
            const request = httpMocks.createRequest({
                method: "POST",
                url: "/createUser",
                body: interfaceCreateUser
            })
            const response: MockResponse<Response> = createResponse();

            when(UserService.createUser).calledWith(interfaceCreateUser).mockResolvedValueOnce(interfaceObjectUser);

            await UserController.createUser(request, response);
            const responsedata: User = response._getJSONData();
            expect(response._getStatusCode()).toEqual(200);
            expect(responsedata.emailAddress).toEqual(interfaceObjectUser.emailAddress);


        })

    });


})

const interfaceCreateUser: CreateUser = {
    userName: "test1",
    emailAddress: "test@gmail.com",
    userPassword: "testpass"
}

const interfaceObjectUser: User = {
    userId: 1,
    userName: "test",
    emailAddress: "test@gmail.com",
    userPassword: "newpass",
    trustedUser: false,
    userLevelId: 2
}