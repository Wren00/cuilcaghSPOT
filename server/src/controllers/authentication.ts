import express, { Request, Response } from 'express';
import { AuthenticationService } from "../services/authentication";
import { User } from "../interfaces/user";
import { Tokens } from "../interfaces/tokens";

async function userLogin(req: Request, res: Response) {
    try {
        console.log("Attempting log in with: " + req.body.userName + " " + req.body.userPassword)
        const { userName, userPassword } = req.body;
        const response = await AuthenticationService.userLogin(userName, userPassword);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json("Invalid credentials.");
    }
}

const AuthenticationController = { userLogin };

export { AuthenticationController };