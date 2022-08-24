import { Response } from "express";
import { UserController } from "../user";
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { when } from "jest-when";
import { UserService } from "../../services/user";
import { User, CreateUser } from "../../interfaces/user";
import { UserProfile } from "../../interfaces/userProfile";

jest.mock("../../services/user.ts");

describe("UserController", () => {
  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getAllUsers",
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getAllUsers).calledWith().mockResolvedValueOnce([interfaceObjectUser]);

      await UserController.getAllUsers(request, response);
      const responseData: User = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.userName).toEqual(interfaceObjectUser.userName);
    });
  });

  describe("getUserById", () => {
    it("should return an user group by the id", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getUserById/",
        params: { id: 1 },
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getUserById).calledWith(1).mockResolvedValueOnce(interfaceObjectUser);

      await UserController.getUserById(request, response);
      const responseData: User = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.userId).toEqual(interfaceObjectUser.userId);
    });
  });

  describe("getUserByName", () => {
    it("should return users by the name", async () => {
      const getUserByNameJsonBody = { userName: "test" };
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getUserByName",
        body: getUserByNameJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getUserByName)
        .calledWith(getUserByNameJsonBody.userName)
        .mockResolvedValueOnce([interfaceObjectUser]);

      await UserController.getUserByName(request, response);
      const responseData: User = response._getJSONData()[0];
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.userName).toEqual(interfaceObjectUser.userName);
    });
  });

  describe("getUserByEmail", () => {
    it("should find a user with the email address", async () => {
      const getUserByEmailJsonBody = { emailAddress: "test@gmail.com" };
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getUserByEmail",
        body: getUserByEmailJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getUserByEmail).calledWith("test@gmail.com").mockResolvedValueOnce(interfaceObjectUser);

      await UserController.getUserByEmail(request, response);
      const responseData: User = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.emailAddress).toEqual(interfaceObjectUser.emailAddress);
    });
  });

  describe("getUserBy", () => {
    it("should find a user with the email address", async () => {
      const getUserByEmailJsonBody = { emailAddress: "test@gmail.com" };
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/getUserByEmail",
        body: getUserByEmailJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getUserByEmail).calledWith("test@gmail.com").mockResolvedValueOnce(interfaceObjectUser);

      await UserController.getUserByEmail(request, response);
      const responseData: User = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.emailAddress).toEqual(interfaceObjectUser.emailAddress);
    });
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/createUser",
        body: interfaceCreateUser,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.createUser).calledWith(interfaceCreateUser).mockResolvedValueOnce(interfaceObjectUser);

      await UserController.createUser(request, response);
      const responseData: User = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.emailAddress).toEqual(interfaceObjectUser.emailAddress);
    });
  });

  describe("updateUserDetails", () => {
    it("should return an updated user", async () => {
      const updateUserJsonBody = {
        userId: 1,
        userName: "updated",
        emailAddress: "update@gmail.com",
      };
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/updateUserDetails",
        body: updateUserJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.updateUserDetails).calledWith(updateUserJsonBody).mockResolvedValueOnce(interfaceObjectUser);

      await UserController.updateUserDetails(request, response);
      const responseData: User = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.userName).toEqual(interfaceObjectUser.userName);
    });
  });

  describe("updateUserPassword", () => {
    it("should return an updated password", async () => {
      const updateUserPasswordBody = {
        userId: 1,
        userPassword: "updatedPassword",
      };
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/updateUserPassword",
        body: updateUserPasswordBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.updateUserPassword)
        .calledWith(updateUserPasswordBody)
        .mockResolvedValueOnce(interfaceObjectUser);

      await UserController.updateUserPassword(request, response);
      const responseData: User = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.userPassword).toEqual(interfaceObjectUser.userPassword);
    });
  });

  describe("updateUserProfile", () => {
    it("should return an updated user profile", async () => {
      const updateProfileJsonBody = {
        profileId: 1,
        profileMessage: "updated profile",
        profilePicture: "picture.jpg",
      };
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/updateUserProfile",
        body: updateProfileJsonBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.updateUserProfile)
        .calledWith(updateProfileJsonBody)
        .mockResolvedValueOnce(interfaceObjectProfile);

      await UserController.updateUserProfile(request, response);
      const responseData: UserProfile = response._getJSONData();
      expect(response._getStatusCode()).toEqual(200);
      expect(responseData.profileMessage).toEqual(interfaceObjectProfile.profileMessage);
    });
  });
});

const interfaceCreateUser: CreateUser = {
  userName: "test1",
  emailAddress: "test@gmail.com",
  userPassword: "password",
};

const interfaceObjectUser: User = {
  userId: 1,
  userName: "test",
  emailAddress: "test@gmail.com",
  userPassword: "password",
  trustedUser: false,
  userLevelId: 2,
};

const interfaceObjectProfile: UserProfile = {
  profileId: 1,
  profileMessage: "NEW PROFILE",
  profilePicture: "NA.JPG",
};
