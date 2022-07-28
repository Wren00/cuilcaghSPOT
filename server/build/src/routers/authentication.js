"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRouter = void 0;
var express_1 = __importDefault(require("express"));
var authentication_1 = require("../controllers/authentication");
var AuthenticationRouter = express_1.default.Router();
exports.AuthenticationRouter = AuthenticationRouter;
AuthenticationRouter.post("/userLogin", authentication_1.AuthenticationController.userLogin);
AuthenticationRouter.post("/getRefreshToken", authentication_1.AuthenticationController.refresh);
