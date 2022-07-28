"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupRouter = void 0;
var express_1 = __importDefault(require("express"));
var userGroup_1 = require("../controllers/userGroup");
var UserGroupRouter = express_1.default.Router();
exports.UserGroupRouter = UserGroupRouter;
UserGroupRouter.get("/getAllUserGroups", userGroup_1.UserGroupController.getAllUserGroups);
UserGroupRouter.get("/getUserGroupByName", userGroup_1.UserGroupController.getUserGroupByName);
UserGroupRouter.post("/createUserGroup", userGroup_1.UserGroupController.createUserGroup);
