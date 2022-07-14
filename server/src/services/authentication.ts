import { Request, Response, NextFunction } from 'express';
import { prisma } from "../utils/prisma";
import { User } from "../interfaces/user";
import { accessTokenKey } from '../constants/authentication';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { stringify } from 'querystring';

async function userLogin(userName: string, userPassword: string)    {

const user = await prisma.users.findUnique({
    where: { user_name : userName },
});

console.log(user);

console.log(userPassword);

if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(userPassword, user.user_password);
    console.log(validPassword);
    if (validPassword) { 

      //generate token using user details
      
      const token = await generateToken(user.id);

      const options =  {
        maxAge: "1d"
      }

      jwt.verify(token, Buffer.from((accessTokenKey), 'base64'), options);

      console.log(token);

      //console logs indicate the program runs to here and then seems to through an error as the return on Postman states it's invalid.

      return true;


    } else {
      return false;
    }
  } else {
    console.log("Invalid credentials.");
  }
}

  async function generateToken(id : number)  {

    //generate payload for user

    const options =  {
      expiresIn : "1d"
    }
    //JWT signing and return token

    const jwtToken = jwt.sign( { userId : id }, accessTokenKey, options); //signing with payload, key and Options(expiry time)
    console.log(jwtToken);
    return jwtToken;
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

const AuthenticationService = { userLogin, generateToken };

export { AuthenticationService };