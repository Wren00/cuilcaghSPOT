import express from "express";
import {
    AuthenticationController
} from "../controllers/authentication";

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/userLogin", AuthenticationController.userLogin);



export { AuthenticationRouter };