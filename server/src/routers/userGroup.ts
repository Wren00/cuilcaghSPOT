import express from "express";
import {
    UserGroupController
} from "../controllers/userGroup";

const UserGroupRouter = express.Router();

//PUBLIC endpoints

UserGroupRouter.get("/getAllUserGroups", UserGroupController.getAllUserGroups);
UserGroupRouter.get("/getUserGroupByName", UserGroupController.getUserGroupByName);

//PRIVATE endpoints

UserGroupRouter.get("/getUserGroupById", UserGroupController.getUserGroupById);
UserGroupRouter.put("/updateUserGroup", UserGroupController.updateUserGroup);
UserGroupRouter.post("/createUserGroup", UserGroupController.createUserGroup);
UserGroupRouter.delete("/deleteUserGroupById", UserGroupController.deleteUserGroupById);



export { UserGroupRouter };