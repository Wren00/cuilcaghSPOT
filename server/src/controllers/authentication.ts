import { Request, Response } from "express";
import { AuthenticationService } from "../services/authentication";

async function userLogin(req: Request, res: Response) {
  try {
    console.log("Attempting log in with: " + req.body.userName + " " + req.body.userPassword);
    const { userName, userPassword } = req.body;
    const tokens = await AuthenticationService.userLogin(userName, userPassword);

    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json("Invalid login.");
  }
}

async function refresh(req: Request, res: Response) {
  try {
    const bearer = req.get("Refresh") as string;
    const tokens = await AuthenticationService.refresh(bearer);

    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json("Couldn't generate token");
  }
}

const AuthenticationController = { userLogin, refresh };

export { AuthenticationController };
