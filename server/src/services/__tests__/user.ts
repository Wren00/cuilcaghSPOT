jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
import { users } from "@prisma/client";
import { prismaAsAny } from "../../testutil/prisma";
import { UserService } from "../user";


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
        it ("should return a list of users by their level", async () => {
            prismaAsAny.users = {
                findMany: jest.fn().mockReturnValueOnce([userModel]),
            };
            const result = await UserService.getUserByLevel(2);
            expect(result[0].userLevelId).toEqual(userModel.user_level_id);

        })

    });

});

const userModel: users = {
    id: 10,
    user_name: "user1",
    email_address: "user1@gmail.com",
    user_password: "********",
    trusted_user: false,
    user_level_id: 2,
    user_profile_id: 10

}
