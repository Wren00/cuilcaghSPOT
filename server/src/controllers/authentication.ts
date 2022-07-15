import express, { Request, Response } from 'express';
import { AuthenticationService } from "../services/authentication";
import { User } from "../interfaces/user";
import { Tokens } from "../interfaces/tokens";
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';

async function userLogin(req: Request, res: Response) {
    try {
        console.log("Attempting log in with: " + req.body.userName + " " + req.body.userPassword)
        const { userName, userPassword } = req.body
        const userCheck = await AuthenticationService.userLogin(userName, userPassword);
        
        try {
            console.log("Attempting token check: ");
            const newToken = await AuthenticationService.generateToken(userCheck);
            
            res.status(200).json(newToken);
        } catch (error) {
            res.status(401).json("Invalid token.");
        }

    }
    catch (error) {
        res.status(401).json("Invalid login.");
    }
}

async function checkUserToken(req: Request, res: Response) {

    //So you have a login endpoint, all you want that to do is return a token.
// Then you want a verify endpoint, all you want that to do is verify a token

    try {
        console.log("Attempting token check: ");
        const { token } = req.body;
        const response = await AuthenticationService.verifyToken(token);
        res.status(200).json(response);
    }
    catch (error)   {
        res.status(401).json(error);
    }
}



const AuthenticationController = { userLogin, checkUserToken };

export { AuthenticationController };
