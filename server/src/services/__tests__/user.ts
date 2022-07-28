import { users, user_profiles } from "@prisma/client";
import { CreateUser, User } from "../../interfaces/user";
import { prismaAsAny } from "../../testutil/prisma";
import { UserService } from "../user";

jest.mock('@prisma/client');
jest.mock('../../utils/prisma');
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

    describe("createUser", () => {

        it("should create a new user", async () => {
            const prismaObjectUser = userModel;
            console.log(prismaObjectUser);

            const interfaceObjectUser : CreateUser = {
                userName: "user1",
                emailAddress: "user1@gmail.com",
                userPassword: "********"
            }
            
            prismaAsAny.user_profiles = {
                create: jest.fn().mockResolvedValueOnce(userProfileModel),
            }
            prismaAsAny.users = {
                create: jest.fn().mockResolvedValueOnce(prismaObjectUser),
            }
           
            const result = await UserService.createUser(interfaceObjectUser);
            console.log(result);
            expect(result.user_name).toEqual(prismaObjectUser.user_name);
        })
    });

    describe("updateUser", () => {

        it("should update a user", async () => {
            const prismaObjectUser = {
                id: 15,
                user_name: "newuser",
                email_address: "newemail@gmail.com",
                user_password: "*******",
                trusted_user: false,
                user_level_id: 2
            }

            const interfaceObjectUser : User = {
                userId: 15,
                userName: "updatinguser",
                emailAddress: "updateemail@gmail.com",
                userPassword: "******",
                trustedUser: false,
                userLevelId: 2
            }

            prismaAsAny.users = {
                update: jest.fn().mockResolvedValueOnce(prismaObjectUser),
            }
            const final = await UserService.updateUser(interfaceObjectUser);

            expect(final.userName).toEqual(prismaObjectUser.user_name);
        })
    });


    describe("deleteUserById", () => {
        it("should delete a user using the id", async () => {
            prismaAsAny.users = {
                delete: jest.fn().mockReturnValueOnce("Success"),
            };

            const mock = await UserService.deleteUserById(10);

            expect(mock).toEqual("Success");
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
    user_profile_id: 10

}

const userProfileModel: user_profiles = {
    id: 10,
    profile_message: "New Profile",
    profile_picture: "apic.jpg"
}

