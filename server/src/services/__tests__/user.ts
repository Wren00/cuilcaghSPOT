import { users, user_profiles } from "@prisma/client";
import { CreateUser, User } from "../../interfaces/user";
import { prismaAsAny } from "../../testutil/prisma";
import { UserService } from "../user";
import bcrypt from "bcrypt";

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should return full list of users", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValue([userModel]),
      };
      const result = await UserService.getAllUsers();
      expect(result[0].userName).toEqual(userModel.user_name);
    });
  });

  describe("getUserById", () => {
    it("should return a user with their id", async () => {
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValueOnce(userModel),
      };
      const result = await UserService.getUserById(10);
      expect(result.userId).toEqual(userModel.id);
    });
  });

  describe("getUserByName", () => {
    it("should return an User", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValue([userModel]),
      };
      const result = await UserService.getUserByName("user1");
      expect(result[0].userName).toEqual(userModel.user_name);
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user with their email", async () => {
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValueOnce(userModel),
      };
      const result = await UserService.getUserByEmail("user1@gmail.com");
      expect(result.emailAddress).toEqual(userModel.email_address);
    });
  });

  describe("getUserByLevel", () => {
    it("should return a list of users by their level", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValueOnce([userModel]),
      };
      const result = await UserService.getUserByLevel(2);
      expect(result[0].userLevelId).toEqual(userModel.user_level_id);
    });
  });

  describe("getTrustedUsers", () => {
    it("should return a list of users by whether they are trusted or not trusted", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValueOnce([userModel]),
      };
      const result = await UserService.getTrustedUsers(false);
      expect(result[0].trustedUser).toEqual(userModel.trusted_user);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const prismaObjectUser = userModel;
      console.log(prismaObjectUser);

      const interfaceObjectUser: CreateUser = {
        userName: "user1",
        emailAddress: "user1@gmail.com",
        userPassword: "********",
      };

      prismaAsAny.user_profiles = {
        create: jest.fn().mockResolvedValueOnce(userProfileModel),
      };
      prismaAsAny.users = {
        create: jest.fn().mockResolvedValueOnce(prismaObjectUser),
      };

      const result = await UserService.createUser(interfaceObjectUser);
      console.log(result);
      expect(result).toEqual(prismaObjectUser.user_name);
    });
  });

  describe("updateUserDetails", () => {
    it("should update a user", async () => {
      const prismaObjectUser = {
        id: 15,
        user_name: "new user",
        email_address: "newemail@gmail.com",
        user_password: "*******",
        trusted_user: false,
        user_level_id: 2,
      };

      const interfaceObjectUser: User = {
        userId: 15,
        userName: "updating user",
        emailAddress: "updateemail@gmail.com",
        userPassword: "******",
        trustedUser: false,
        userLevelId: 2,
      };

      prismaAsAny.users = {
        update: jest.fn().mockResolvedValueOnce(prismaObjectUser),
      };
      const final = await UserService.updateUserDetails(interfaceObjectUser);

      expect(final.user_name).toEqual(prismaObjectUser.user_name);
    });
  });

  describe("updateUserProfile", () => {
    it("should update a users profile", async () => {
      const prismaObjectProfile = {
        id: 15,
        profile_message: "new user",
        profile_picture: "avatar.jpg",
      };

      const interfaceObjectProfile = {
        profileId: 15,
        profileMessage: "testing update",
        profilePicture: "avatar.jpg",
      };

      prismaAsAny.user_profiles = {
        update: jest.fn().mockResolvedValueOnce(prismaObjectProfile),
      };
      const final = await UserService.updateUserProfile(interfaceObjectProfile);

      expect(final.profile_message).toEqual(prismaObjectProfile.profile_message);
    });
  });

  describe("updateUserPassword", () => {
    it("should update a users password", async () => {
      const salt = await bcrypt.genSalt();

      const testPassword = "test pass";

      const newPassword = await bcrypt.hash(testPassword, salt);

      const prismaObjectUser = {
        id: 15,
        user_name: "new user",
        email_address: "newemail@gmail.com",
        user_password: "password",
        trusted_user: false,
        user_level_id: 2,
      };

      const interfaceObjectUser: User = {
        userId: 10,
        userName: "user1",
        emailAddress: "user1@gmail.com",
        userPassword: newPassword,
        trustedUser: false,
        userLevelId: 2,
      };

      prismaAsAny.users = {
        update: jest.fn().mockResolvedValueOnce(prismaObjectUser),
      };
      await UserService.updateUserPassword(interfaceObjectUser);
      const comparePasswords = await bcrypt.compare(testPassword, interfaceObjectUser.userPassword);

      expect(comparePasswords).toBe(true);
    });
  });
});

const userModel: users = {
  id: 10,
  user_name: "user1",
  email_address: "user1@gmail.com",
  user_password: "********",
  trusted_user: false,
  user_level_id: 2,
  user_profile_id: 10,
};

const userProfileModel: user_profiles = {
  id: 10,
  profile_message: "New Profile",
  profile_picture: "apic.jpg",
};
