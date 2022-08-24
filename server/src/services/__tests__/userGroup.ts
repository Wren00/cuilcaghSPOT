jest.mock("@prisma/client");
jest.mock("../../utils/prisma");
import { interest_groups } from "@prisma/client";
import { UserGroup } from "../../interfaces/userGroup";
import { prismaAsAny } from "../../testutil/prisma";
import { UserGroupService } from "../userGroup";

describe("UserGroupService", () => {
  describe("getAllUserGroups", () => {
    it("should return full list of users", async () => {
      prismaAsAny.interest_groups = {
        findMany: jest.fn().mockReturnValue([groupModel]),
      };
      const result = await UserGroupService.getAllUserGroups();
      expect(result[0].groupName).toEqual(groupModel.group_name);
    });
  });

  describe("getUserGroupById", () => {
    it("should return a user group with the id", async () => {
      prismaAsAny.interest_groups = {
        findUnique: jest.fn().mockReturnValueOnce(groupModel),
      };
      const result = await UserGroupService.getUserGroupById(5);
      expect(result.groupId).toEqual(groupModel.id);
    });
  });

  describe("getUserGroupByName", () => {
    it("should return user groups using their names", async () => {
      prismaAsAny.interest_groups = {
        findMany: jest.fn().mockReturnValue([groupModel]),
      };
      const result = await UserGroupService.getUserGroupByName("test group");
      expect(result[0].groupName).toEqual(groupModel.group_name);
    });
  });

  describe("updateUserGroup", () => {
    it("should update a user groups name or description", async () => {
      const prismaObjectGroup = groupModel;

      const interfaceObjectGroup: UserGroup = {
        groupId: 6,
        groupName: "update group",
        description: "has been updated",
      };

      prismaAsAny.interest_groups = {
        update: jest.fn().mockResolvedValueOnce(prismaObjectGroup),
      };

      const final = await UserGroupService.updateUserGroup(interfaceObjectGroup);

      expect(final.group_name).toEqual(prismaObjectGroup.group_name);
    });
  });

  describe("createUserGroup", () => {
    it("should create a new user group", async () => {
      const prismaObjectGroup = groupModel;
      const interfaceObjectGroup: UserGroup = {
        groupName: "new group",
        description: "a test group",
        groupId: 2,
      };

      prismaAsAny.interest_groups = {
        create: jest.fn().mockResolvedValueOnce(prismaObjectGroup),
      };

      const final = await UserGroupService.createUserGroup(interfaceObjectGroup);

      expect(final.group_name).toEqual(prismaObjectGroup.group_name);
    });
  });

  describe("deleteUserGroupById", () => {
    it("should delete a user group using the id", async () => {
      prismaAsAny.interest_groups = {
        delete: jest.fn().mockReturnValueOnce(groupModel),
      };
      const result = await UserGroupService.deleteUserGroupById(5);

      expect(result.id).toEqual(groupModel.id);
    });
  });
});

const groupModel: interest_groups = {
  id: 5,
  group_name: "test group",
  description: "a test group",
};
