import { prisma } from "../utils";
import bcrypt from "bcrypt";
import { User, CreateUser } from "../interfaces/user";
import { UserProfile } from "../interfaces/userProfile";

async function getAllUsers() {
  let allUsers;
  try {
    allUsers = await prisma.users.findMany();
  } catch (error) {
    console.log(error);
  }
  const users: User[] = allUsers.map(
    (x: {
      id: any;
      user_name: any;
      email_address: any;
      user_password: any;
      trusted_user: any;
      user_level_id: any;
    }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword: x.user_password,
      trustedUser: x.trusted_user,
      userLevelId: x.user_level_id,
    })
  );
  return users;
}

async function getUserByName(userName: string) {
  let userArray;
  try {
    userArray = await prisma.users.findMany({
      where: { user_name: { contains: userName, mode: "insensitive" } },
    });
  } catch (error) {
    console.log(error);
  }
  const users: User[] = userArray.map(
    (x: {
      id: any;
      user_name: any;
      email_address: any;
      user_password: any;
      trusted_user: any;
      user_level_id: any;
    }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword: x.user_password,
      trustedUser: x.trusted_user,
      userLevelId: x.user_level_id,
    })
  );

  return users;
}

async function getUserById(userId: number) {
  let userObject;

  try {
    userObject = await prisma.users.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.log(error);
  }

  const returnedValue = {
    userId: userObject.id,
    userName: userObject.user_name,
    emailAddress: userObject.email_address,
    userPassword: userObject.user_password,
    trustedUser: userObject.trusted_user,
    userLevelId: userObject.user_level_id,
  };
  return returnedValue;
}

async function getProfileByUserId(userId: number) {
  let userObject;
  let profileObject;

  try {
    userObject = await prisma.users.findUnique({
      where: { id: userId },
    });
    console.log(userId);
  } catch (error) {
    console.log(error);
  }

  try {
    profileObject = await prisma.user_profiles.findUnique({
      where: { id: userObject.user_profile_id },
    });
  } catch (error) {
    console.log(error);
  }

  const returnedValue = {
    profileId: profileObject.id,
    profileMessage: profileObject.profile_message,
    profilePicture: profileObject.profile_picture
  };
  console.log(returnedValue);
  return returnedValue;
}



async function getUserByEmail(userEmail: string) {
  let userObject;
  try {
    userObject = await prisma.users.findUnique({
      where: { email_address: userEmail },
    });
  } catch (error) {
    console.log(error);
  }

  const returnedValue = {
    userId: userObject.id,
    userName: userObject.user_name,
    emailAddress: userObject.email_address,
    userPassword: userObject.user_password,
    trustedUser: userObject.trusted_user,
    userLevelId: userObject.user_level_id,
  };

  return returnedValue;
}

async function getTrustedUsers(trustedUser: boolean) {
  let userArray;
  try {
    userArray = await prisma.users.findMany({
      where: { trusted_user: trustedUser },
    });
  } catch (error) {
    console.log(error);
  }
  const users: User[] = userArray.map(
    (x: {
      id: any;
      user_name: any;
      email_address: any;
      user_password: any;
      trusted_user: any;
      user_level_id: any;
    }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword: x.user_password,
      trustedUser: x.trusted_user,
      userLevelId: x.user_level_id,
    })
  );

  return users;
}

async function getUserByLevel(userLevel: number) {
  let userArray;
  try {
    userArray = await prisma.users.findMany({
      where: { user_level_id: userLevel },
    });
  } catch (error) {
    console.log(error);
  }
  const users: User[] = userArray.map(
    (x: {
      id: any;
      user_name: any;
      email_address: any;
      user_password: any;
      trusted_user: any;
      user_level_id: any;
    }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword: x.user_password,
      trustedUser: x.trusted_user,
      userLevelId: x.user_level_id,
    })
  );

  return users;
}

//UPDATE functions

async function updateUserDetails(user: User) {
  let updateUser;
  try {
    updateUser = await prisma.users.update({
      where: {
        id: user.userId,
      },
      data: {
        user_name: user.userName,
        email_address: user.emailAddress,
        user_level_id: user.userLevelId,
        trusted_user: user.trustedUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateUser;
}

async function updateUserPassword(user: User) {
  let updatedPassword;
  const salt = await bcrypt.genSalt();

  updatedPassword = await bcrypt.hash(user.userPassword, salt);

  try {
    updatedPassword = await prisma.users.update({
      where: {
        id: user.userId,
      },
      data: {
        user_password: updatedPassword,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updatedPassword;
}

async function updateUserProfile(updateProfile: UserProfile) {
  let updatedProfile;
  try {
    updatedProfile = await prisma.user_profiles.update({
      where: {
        id: updateProfile.profileId,
      },
      data: {
        profile_message: updateProfile.profileMessage,
        profile_picture: updateProfile.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updatedProfile;
}

//CREATE function

async function createUser(user: CreateUser) {
  try {
    const newProfile = await prisma.user_profiles.create({
      data: {
        profile_message: "New User",
        profile_picture: 'https://cuilcaghspot.s3.eu-west-1.amazonaws.com/514-5147366_default-avatar-comments-avatar.jpg',
      },
    });

  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(user.userPassword, salt);

  const newUser = await prisma.users.create({
    data: {
      user_name: user.userName,
      email_address: user.emailAddress,
      user_password: hashedPassword,
      trusted_user: false,
      user_level_id: 2,
      user_profile_id: newProfile.id,
    },
  });

  const createdUser = {
    userId: newUser.id,
    userName: newUser.user_name,
    emailAddress: newUser.email_address,
    trustedUser: newUser.trusted_user,
    userLevelId: newUser.user_level_id,
  };
    return createdUser.userName;
  }catch(error) {
    throw Error("Cannot create user");
  }
}

//DELETE function -- USER DETAILS TO BE OBFUSCATED RATHER THAN DELETED

async function deleteUserById(userId: number) {
  let deletedUser;
  try {
    deletedUser = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        user_name: "DELETEDUSER",
        email_address: "DELETED",
        user_password: "DELETEDUSERPASS",
        user_level_id: 1
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedUser;
}

const UserService = {
  getAllUsers,
  getUserByName,
  getUserById,
  getProfileByUserId,
  getUserByEmail,
  getUserByLevel,
  getTrustedUsers,
  createUser,
  updateUserDetails,
  updateUserPassword,
  updateUserProfile,
  deleteUserById
};

export { UserService };
