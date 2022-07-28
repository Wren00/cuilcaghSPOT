import express, { Request, Response } from 'express';
import { UserService } from "../services/user";
import { User } from "../interfaces/user";
import { CreateUser } from "../interfaces/user";
import { UserProfile } from '../interfaces/userProfile';


async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
    }catch(error) {
      res.status(401).json("Cannot access database");
    }
  }

async function getUserByName(req: Request, res: Response) {
  try {
    const { userName : userName} = req.body;
    const users = await UserService.getUserByName(userName);
    return res.status(200).json(users);
    }catch(error) {
      res.status(401).json("Cannot find user name");
    }
  }

async function getuserById(req: Request, res: Response) {
  try {
    const { userId: userId} = req.body;
    const user = await UserService.getUserById(userId);
    return res.status(200).json(user);
    }catch(error) {
      res.status(401).json("Cannot find user id");
    }
  }
async function getuserByEmail(req: Request, res: Response) {
  try {
    const { emailAddress : emailAddress} = req.body;
    const user = await UserService.getUserByEmail(emailAddress);
    return res.status(200).json(user);
    }catch(error) {
      res.status(401).json("Cannot find email address");
    }
  }

async function getuserByLevel(req: Request, res: Response) {
  try {
    const { userLevelId : userLevelId} = req.body;
    const users = await UserService.getUserByLevel(userLevelId);
    return res.status(200).json(users);
    }catch(error) {
      res.status(401).json("Cannot find users of that level");
    }
  }

async function getTrustedUsers(req: Request, res: Response) {
  try {
    const { trustedUser : trustedUser} = req.body;
    const users = await UserService.getTrustedUsers(trustedUser);
    return res.status(200).json(users);
    }catch(error) {
      res.status(401).json("Invalid entry on trusted users");
    }
  }

//UPDATE functions

async function updateUserDetails(req: Request, res: Response) {
  try{
    const updateDetails: User= req.body;
    const updatedUser = await UserService.updateUserDetails(updateDetails);
    return res.status(200).json(updatedUser);
    }catch(error) {
      res.status(500).json("Could not update user.");
    }
  }

  async function updateUserPassword(req: Request, res: Response) {
    try{
      const updatePassword: User= req.body;
      const newPassword = await UserService.updateUserPassword(updatePassword);
      return res.status(200).json(newPassword);
      }catch(error) {
        res.status(500).json("Could not update password.");
      }
    }

  async function updateUserProfile(req: Request, res: Response) {
    try{
      const updateDetails: UserProfile = req.body;
      const updatedProfile = await UserService.updateUserProfile(updateDetails);
      return res.status(200).json(updatedProfile);
      }catch(error) {
        res.status(500).json("Could not update profile.");
      }
    }

//CREATE functions - createUser also creates a UserProfile

async function createUser(req: Request, res: Response) {
  const newUser: CreateUser = req.body;

  const createdUser = await UserService.createUser(newUser);

  return res.status(200).json(createdUser);
}

async function deleteUserById(req: Request, res: Response)    {
  const { id: userId } = req.body;

  const deletedUser = await UserService.deleteUserById(userId);
  if(!deletedUser)  {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedUser);
}



const UserController = {
  getAllUsers, getUserByName, getuserById, getuserByEmail, getuserByLevel, getTrustedUsers,
  createUser,
  updateUserDetails, updateUserPassword, updateUserProfile,
  deleteUserById
};

export { UserController };