import express, { Request, Response } from 'express';
import { AuthenticationService } from "../services/authentication";
import { User } from "../interfaces/user";
import { Tokens } from "../interfaces/tokens";
import  jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';

async function userLogin(req: Request, res: Response) {
    try {
        console.log("Attempting log in with: " + req.body.userName + " " + req.body.userPassword)
        const { userName, userPassword } = req.body
        const response = await AuthenticationService.userLogin(userName, userPassword);

        //code doesn't get to this console log.
        console.log(response);

        res.status(200).json("Successful login");
         }
        catch (error) {
        res.status(401).json("Invalid login.");
    }
}

async function checkUserToken(req: Request, res: Response)  {

    try {
        console.log("Attempting token check: ");
        const id = req.body.userId;
        const response = AuthenticationService.generateToken(id);
        res.status(200).json("Successful");
    } catch (error) {
        res.status(401).json("Invalid credentials.");
    }

    }



const AuthenticationController = { userLogin, checkUserToken };

export { AuthenticationController };
