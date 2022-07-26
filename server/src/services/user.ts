import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import { User, CreateUser } from "../interfaces/user";

async function getAllUsers() {

  const manyObjects = await prisma.users.findMany();
  const users: User[] = manyObjects.map((x: 
    { id: any; user_name: any; email_address: any; user_password: any; trusted_user: any; user_level_id: any }) => ({
    userId: x.id,
    userName: x.user_name,
    emailAddress: x.email_address,
    userPassword: x.user_password,
    trustedUser: x.trusted_user,
    userLevelId: x.user_level_id
  }));
  return users;

}

async function getUserByName(userName: string) {
  const manyObjects =  await prisma.users.findMany({
    where: { user_name: { contains: userName, mode: "insensitive" } },
  });
  const users: User[] = manyObjects.map((x: 
    { id: any; user_name: any; email_address: any; user_password: any; trusted_user: any; user_level_id: any; }) => ({
    userId: x.id,
    userName: x.user_name,
    emailAddress: x.email_address,
    userPassword : x.user_password,
    trustedUser: x.trusted_user,
    userLevelId: x.user_level_id
  }));
  return users;
  }


  
  async function getUserById(userId: number) {
    const userObject =  await prisma.users.findUnique({
      where: { id: userId },
    });
  
    let returnedValue = {
      userId: userObject.id,
      userName: userObject.user_name,
      emailAddress: userObject.email_address,
      userPassword: userObject.user_password,
      trustedUser: userObject.trusted_user,
      userLevelId: userObject.user_level_id
    }
  
    return returnedValue;
  }
  
  async function getUserByEmail(userEmail: string) {
    const userObject =  await prisma.users.findUnique({
      where: { email_address : userEmail },
    });
  
    let returnedValue = {
      userId: userObject.id,
      userName: userObject.user_name,
      emailAddress: userObject.email_address,
      userPassword: userObject.user_password,
      trustedUser: userObject.trusted_user,
      userLevelId: userObject.user_level_id
    }
  
    return returnedValue;
  }

  async function getTrustedUsers(trustedUser: boolean)  {
    const manyObjects =  await prisma.users.findMany({
      where: { trusted_user: trustedUser },
    });
    const users: User[] = manyObjects.map((x: 
      { id: any; user_name: any; email_address: any; user_password: any; trusted_user: any; user_level_id: any; }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword : x.user_password,
      trustedUser: x.trusted_user,
      userLevelId: x.user_level_id
    }));
    return users;
    }

  async function getUserByLevel(userLevel: number)  {
    const manyObjects =  await prisma.users.findMany({
      where: { user_level_id : userLevel },
    });
    const users: User[] = manyObjects.map((x: 
      { id: any; user_name: any; email_address: any; user_password: any; trusted_user: any; user_level_id: any; }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword : x.user_password,
      trustedUser: x.trusted_user,
      userLevelId: x.user_level_id
    }));
    return users;
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
    console.log(hashedPassword);
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
    getTrustedUsers,
    createUser,
    updateUser,
    deleteUserById
  };
  
  export { UserService };