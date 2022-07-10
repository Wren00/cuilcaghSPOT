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
UserRouter.put("/updateUser", UserController.updateUser);
UserRouter.post("/createUser", UserController.createUser);
UserRouter.delete("/deleteUserById", UserController.deleteUserById);


export { UserRouter };