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

async function getRefreshToken(req: Request, res: Response) {

    try {
        console.log("Refreshing token: ");         
        const { token } = req.body
         const refreshToken = await AuthenticationService.generateRefreshToken(token);
            res.status(200).json(refreshToken);
        }
        catch(error)    {
            res.status(401).json("Couldn't generate token");
        }
    }



const AuthenticationController = { userLogin, getRefreshToken };

export { AuthenticationController };
