import express from "express";
import {
    UserGroupController
} from "../controllers/userGroup";

const UserGroupRouter = express.Router();

UserGroupRouter.get("/getAllUserGroups", UserGroupController.getAllUserGroups);
UserGroupRouter.get("/getUserGroupByName", UserGroupController.getUserGroupByName);
UserGroupRouter.post("/createUserGroup", UserGroupController.createUserGroup);



export { UserGroupRouter };