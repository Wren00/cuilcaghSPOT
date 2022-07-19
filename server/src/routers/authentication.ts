import express from "express";
import {
    AuthenticationController
} from "../controllers/authentication";

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/userLogin", AuthenticationController.userLogin);
AuthenticationRouter.post("/getRefreshToken", AuthenticationController.getRefreshToken);



export { AuthenticationRouter };