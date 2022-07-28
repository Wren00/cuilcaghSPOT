import express from "express";
import {
    UserController
} from "../controllers/user";

const UserRouter = express.Router();

UserRouter.get("/getAllUsers", UserController.getAllUsers);
UserRouter.get("/getUserByName", UserController.getUserByName);
UserRouter.get("/getUserById", UserController.getuserById);
UserRouter.get("/getUserByEmail", UserController.getuserByEmail);
UserRouter.get("/getUserByLevel", UserController.getuserByLevel);
UserRouter.get("/getTrustedUsers", UserController.getTrustedUsers);
UserRouter.put("/updateUserDetails", UserController.updateUserDetails);
UserRouter.put("/updateUserPassword", UserController.updateUserPassword);
UserRouter.put("/updateUserProfile", UserController.updateUserProfile);
UserRouter.post("/createUser", UserController.createUser);
UserRouter.delete("/deleteUserById", UserController.deleteUserById);


export { UserRouter };