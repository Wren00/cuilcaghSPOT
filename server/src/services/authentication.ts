import { Request, Response, NextFunction } from 'express';
import { prisma } from "../utils/prisma";
import { User } from "../interfaces/user";
import { accessTokenKey, refreshTokenKey } from '../constants/authentication';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { stringify } from 'querystring';
import { triggerAsyncId } from 'async_hooks';
import { users } from '@prisma/client';
import { ConfirmedSightingController } from '../controllers/confirmedSighting';
import { UserController } from '../controllers/user';
import { decode } from 'punycode';

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
      throw Error("Cannot login");
    }
  } else {
    throw Error("Invalid credentials.");
  }
}



async function generateTokens(userId: number) {

  //JWT signing and return token

  //check prisma for the user id
  var checkId = prisma.users.findFirst({
    where: { id: userId },
  });

  if (checkId) {

    const jwtToken = jwt.sign({ userId: userId }, accessTokenKey, { expiresIn: "120s" });
    const refreshToken = jwt.sign({ userId: userId }, refreshTokenKey, { expiresIn: "2h" });

    return [jwtToken, refreshToken] as const;
  }
  else {
    console.log("User doesn't exist");
  }
}

const AuthenticationService = { userLogin, generateTokens };

export { AuthenticationService };