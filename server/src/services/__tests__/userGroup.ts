jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { interest_groups } from "@prisma/client";
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

});

const groupModel: interest_groups = {
    id: 5,
    group_name: "test group",
    description: "a test group"
}
