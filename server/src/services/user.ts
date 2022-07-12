import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import { User, CreateUser } from "../interfaces/user";

async function getAllUsers() {

  const users = prisma.users.findMany();

  return await users;

}

async function getUserByName(userName: string) {
    const users = prisma.users.findMany({
      where: { user_name: { contains: userName, mode: "insensitive" } },
    });
    return await users;
  }
  
  async function getUserById(userId: number) {
    const user = prisma.users.findUnique({
      where: { id: userId },
    });
    return await user;
  }
  
  async function getUserByEmail(userEmail: string) {
    const users = prisma.users.findMany({
      where: { email_address: { contains: userEmail, mode: "insensitive" } },
    });
    return await users;
  }

  async function getUserByLevel(userLevel: number)  {
    const users = prisma.users.findMany({
        where: { user_level_id: userLevel}
    });
    return await users;
  }

  //UPDATE function

  async function updateUser(user: User)   {
  const updateUserName = await prisma.users.update({
    where: {
      id : user.userId
    },
    data: {
      user_name: user.userName,
      email_address: user.emailAddress
    },
    });
  }
  
  //CREATE function

async function createUser(user: CreateUser) {
    console.log(user);
    const newProfile = await prisma.user_profiles.create({
        data: {
            profile_message: "New User"
        }
    })
    //TODO password hash

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(user.userPassword, salt);

    const newUser = await prisma.users.create({
      data: {
        user_name: user.userName,
        email_address: user.emailAddress,
        user_password: hashedPassword,
        trusted_user: false,
        user_level_id: 2,
        user_profile_id: newProfile.id
    },
  })
  }

  //DELETE function

  //TODO fix delete function

  async function deleteUserById(userId: number) {

    const deletedUser = await prisma.users.delete({
      where: {
        id: userId
      },
    });

    await prisma.user_profiles.delete({
        where: {
            id: userId
        }
    })
  }

const UserService = {
    getAllUsers,
    getUserByName,
    getUserById,
    getUserByEmail,
    getUserByLevel,
    createUser,
    updateUser,
    deleteUserById
  };
  
  export { UserService };