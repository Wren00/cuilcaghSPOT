import express, { Request, Response } from 'express';
import { AuthenticationService } from "../services/authentication";
import { User } from "../interfaces/user";
import { Tokens } from "../interfaces/tokens";
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { refreshTokenKey } from '../constants/authentication';
import { read, readSync } from 'fs';

async function userLogin(req: Request, res: Response) {
    try {
        console.log("Attempting log in with: " + req.body.userName + " " + req.body.userPassword)
        const { userName, userPassword } = req.body
        const userCheck = await AuthenticationService.userLogin(userName, userPassword);

        //userLogin generates 2 tokens, an access and a refresh token

        try {
            console.log("Attempting token check: ");
            const newTokens: Readonly<[string, string]> = await AuthenticationService.generateTokens(userCheck.id);
            console.log(newTokens);

            res.status(200).json(newTokens);
        } catch (error) {
            res.status(401).json("Invalid token.");
        }

    }
    catch (error) {
        res.status(401).json("Invalid login.");
    }
}

async function refresh(req: Request, res: Response) {

    try {
        console.log("Refreshing token: ");
        const bearer = req.get("Refresh") as string;
        const token = bearer.substring(7, bearer.length);

        const decodedToken = jwt.decode(token);

        const JSONtoken = JSON.stringify(decodedToken);

        const otherToken = JSONtoken.split(",")[0] + "}";

        const newToken = JSON.parse(otherToken);

        const id = newToken.userId as number;

        const tokens = await AuthenticationService.generateTokens(id);
        console.log(tokens);
        res.status(200).json(tokens);
    }
    catch (error) {
        res.status(401).json("Couldn't generate token");
    }
}



const AuthenticationController = { userLogin, refresh };

export { AuthenticationController };
