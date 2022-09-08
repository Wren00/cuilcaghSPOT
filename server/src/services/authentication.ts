import { prisma } from "../utils";
import { accessTokenKey, refreshTokenKey } from "../constants/authentication";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function userLogin(userName: string, userPassword: string) {
  console.log(userName, userPassword);

  const user = await prisma.users.findUnique({
    where: { user_name: userName },
  });

  if (user) {
    //check that user has a level of 2 or above to avoid deleted users logging in.
    if (user.user_level_id >= 2) {
      const validPassword = await bcrypt.compare(userPassword, user.user_password);
      console.log(validPassword);
      if (validPassword) {
        return await generateTokens(user.id);
      } else {
        throw Error("Cannot login");
      }
    } else {
      throw Error("Invalid credentials.");
    }
  }
  else {
    throw Error("Invalid credentials.");
  }
}

async function refresh(bearer: string) {
  console.log("Refreshing token: ");
  const token = bearer.substring(7, bearer.length);

  const decodedToken = jwt.decode(token);

  const JSONtoken = JSON.stringify(decodedToken);

  const otherToken = JSONtoken.split(",")[0] + "}";

  const newToken = JSON.parse(otherToken);

  const id = newToken.userId as number;

  const tokens = await generateTokens(id);
  console.log(tokens);
  return tokens;
}

async function generateTokens(userId: number) {
  //JWT signing and return token

  //check prisma for the user id
  const checkId = await prisma.users.findFirst({
    where: { id: userId },
  });

  if (checkId) {
    const jwtToken = jwt.sign({ userId: userId }, accessTokenKey, { expiresIn: "120s" });
    const refreshToken = jwt.sign({ userId: userId }, refreshTokenKey, { expiresIn: "2h" });

    return [jwtToken, refreshToken] as const;
  } else {
    console.log("User doesn't exist");
  }
}

const AuthenticationService = { userLogin, generateTokens, refresh };

export { AuthenticationService };
