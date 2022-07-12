interface Tokens { accessToken: string, refreshToken: string };
import { prisma } from "../utils/prisma";
import { User } from "../interfaces/user";
import bcrypt from "bcrypt";

async function userLogin(userName: string, userPassword: string)    {

const user = await prisma.users.findUnique({
    where: { user_name : userName },
});

if( user?.user_password == userPassword)   {
return true;
}
else    {
    console.log("There was an error");
// return false;
throw Error ("Login failed");
}
}

const AuthenticationService = { userLogin };

export { AuthenticationService };