import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "../constants/authentication";

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
  //authenticates all calls going through the api

  if (req.baseUrl === "/api/users/createUser") {
    return next();
  } else if (req.baseUrl === "/api/auth/userLogin") {
    //return logged in user + token

    return next();
  } else if (req.baseUrl === "/api/auth/getRefreshToken") {
    const bearer = req.get("Refresh") as string;
    console.log(bearer);
    const refreshToken = bearer.substring(7, bearer.length);

    try {
      if (jwt.verify(refreshToken, refreshTokenKey)) {
        console.log(jwt.verify(refreshToken, refreshTokenKey));

        return next();
      }
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    try {
      const bearer = req.get("Authorization") as string;
      const token = bearer.substring(7, bearer.length);

      if (jwt.verify(token, accessTokenKey)) {
        console.log(jwt.verify(token, accessTokenKey));

        return next();
      } else {
        const bearer = req.get("Refresh") as string;
        const token = bearer.substring(7, bearer.length);

        if (jwt.verify(token, refreshTokenKey)) {
          console.log(jwt.verify(token, refreshTokenKey));
          return next();
        }
        throw new Error("Invalid middleware");
      }
    } catch (error) {
      res.status(401).json("Access token error " + error);
    }
  }
};

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
