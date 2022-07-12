interface Tokens { accessToken: string, refreshToken: string };
import { prisma } from "../utils/prisma";
import { User } from "../interfaces/user";
import bcrypt from "bcrypt";

async function userLogin(userName: string, userPassword: string)    {

const user = await prisma.users.findUnique({
    where: { user_name : userName },
});

if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(userPassword, user.user_password);
    if (validPassword) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log("Invalid credentials.");
  }
}

const AuthenticationService = { userLogin };

export { AuthenticationService };