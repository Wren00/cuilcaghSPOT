import { Request, Response, NextFunction } from 'express';
import { prisma } from "../utils/prisma";
import { User } from "../interfaces/user";
import { accessTokenKey } from '../constants/authentication';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { stringify } from 'querystring';
import { triggerAsyncId } from 'async_hooks';
import { users } from '@prisma/client';

async function userLogin(userName: string, userPassword: string) {

  console.log(userName, userPassword);

  const user = await prisma.users.findUnique({
    where: { user_name: userName },
  });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(userPassword, user.user_password);
    console.log(validPassword);
    if (validPassword) {

      return user;

    } else {
      throw Error ("Cannot login");
    }
  } else {
    throw Error ("Invalid credentials.");
  }
}

async function generateToken(user: users) {

  //JWT signing and return token
  const jwtToken = jwt.sign({ userId: user.id }, accessTokenKey); //signing with payload and key
  //generate access and refresh tokens return both tokens make access token expiry 2min and refresh 2 hrs
  //create refresh endpoint like login
  //api should be unaccessible to access token and refresh token will fix it.
  //check user, prisma find by id, generate tokens
  
  return jwtToken;
}

async function verifyToken(token: string) {

  //verify passed in token
  return jwt.verify(token, accessTokenKey);

}

// export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let jwt = req.headers.authorization;

//     // verify request has token
//     if (!jwt) {
//       return res.status(401).json({ message: 'Invalid token ' });
//     }

//     // remove Bearer if using Bearer Authorization mechanism
//     if (jwt.toLowerCase().startsWith('bearer')) {
//       jwt = jwt.slice('bearer'.length).trim();
//     }

//     // verify token hasn't expired yet
//     const decodedToken = await validateToken(jwt);

//     const hasAccessToEndpoint = allowedAccessTypes.some(
//       (at) => decodedToken.accessTypes.some((uat) => uat === at)
//     );

//     if (!hasAccessToEndpoint) {
//       return res.status(401).json({ message: 'No enough privileges to access endpoint' });
//     }

//     next();
//   } catch (error) {
//     if (error === 'TokenExpiredError') {
//       res.status(401).json({ message: 'Expired token' });
//       return;
//     }

//     res.status(500).json({ message: 'Failed to authenticate user' });
//   }
// };

const AuthenticationService = { userLogin, generateToken, verifyToken };

export { AuthenticationService };