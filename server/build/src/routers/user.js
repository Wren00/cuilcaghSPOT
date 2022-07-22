"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
UserRouter.get("/getAllUsers", user_1.UserController.getAllUsers);
UserRouter.get("/getUserByName", user_1.UserController.getUserByName);
UserRouter.get("/getUserById", user_1.UserController.getuserById);
UserRouter.get("/getUserByEmail", user_1.UserController.getuserByEmail);
UserRouter.get("/getUserByLevel", user_1.UserController.getuserByLevel);
UserRouter.put("/updateUser", user_1.UserController.updateUser);
UserRouter.post("/createUser", user_1.UserController.createUser);
UserRouter.delete("/deleteUserById", user_1.UserController.deleteUserById);
