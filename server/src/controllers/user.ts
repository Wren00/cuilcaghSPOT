import express, { Request, Response } from 'express';
import { UserService } from "../services/user";
import { User } from "../interfaces/user";
import { CreateUser } from "../interfaces/user";


async function getAllUsers(req: Request, res: Response) {
  const users = await UserService.getAllUsers();
  return res.status(200).json(users);
}

async function getUserByName(req: Request, res: Response) {
  const { userName: userName } = req.body;
  const user = await UserService.getUserByName(userName);
  return res.status(200).json(user);
}

async function getuserById(req: Request, res: Response) {
  const { userId: userId } = req.body;
  const user = await UserService.getUserById(userId);
  return res.status(200).json(user);
}

async function getuserByEmail(req: Request, res: Response) {
  const { emailAddress: userEmail } = req.body;
  const user = await UserService.getUserByEmail(userEmail);
  return res.status(200).json(user);
}

async function getuserByLevel(req: Request, res: Response) {
  const { userLevelId: levelId } = req.body;
  const users = await UserService.getUserByLevel(levelId);
  return res.status(200).json(users);
}

async function getTrustedUsers(req: Request, res: Response) {
  const { trustedUser: trustedUser } = req.body;
  const users = await UserService.getTrustedUsers(trustedUser);
  return res.status(200).json(users);
}

//UPDATE functions

async function updateUser(req: Request, res: Response) {
  const newUser: User = req.body;

  const updateUser = await UserService.updateUser(newUser);
  return res.status(200).json(updateUser);
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
  updateUser,
  deleteUserById
};

export { UserController };