import { Console, error } from "console";
import { NextFunction, Request, Response } from "express";
import { createSecureServer } from "http2";
import jwt from "jsonwebtoken";
import { accessTokenKey } from "../constants/authentication";
import { AuthenticationService } from "../services/authentication";
import { AuthenticationController } from "../controllers/authentication";
import { User, CreateUser } from "../interfaces/user";
import { UserService } from "../services/user";
import { read } from "fs";

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //authenticates all calls going through the api

    if (req.baseUrl === "/api/users/createUser") {
        create(req, res);
    }
    else if (req.baseUrl === "/api/auth/userLogin") {
        //else if is userLogin return logged in user + token
        login(req, res);

    }
    else {

        const bearer = req.get("Authorization") as string;
        const token = bearer.substring(7,bearer.length);

        console.log(token);
        try {
            if (jwt.verify(token, accessTokenKey)) {
                
                return next();
            }
        } catch (error) {
            res.status(401).json(error);
        }
    }
}


// const verify = async (req: Request, res: Response) => {
//     //verify a users token when it calls the api
//     console.log(req.body);
//     const token = req.body.token;

//     return jwt.verify(token, accessTokenKey);

// }

const login = async (req: Request, res: Response) => {
    //login a user and generate a token

    const user = await AuthenticationService.userLogin(req.body.userName, req.body.userPassword);
    const token = await AuthenticationService.generateToken(user);

    return res.status(200).json(token);
}

const create = async (req: Request, res: Response) => {

    const newUser: CreateUser = req.body;

    await UserService.createUser(newUser);

    return res.status(200).json("Successfully created");

}

export { Authenticate };























// function authenticateToken(req, res, next) {

//     const authHeader = req.headers.get['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) {
//         res.status(401).json("Unauthorised");
//     }

//     jwt.verify(token, accessTokenKey, req.userName);
//     if (error) {
//         return res.status(403).json("Unauthorised");
//     }
//     const user = req.userName;
// }

