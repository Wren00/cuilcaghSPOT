import express, { Request, Response } from 'express';
import { UserGroupService } from "../services/userGroup";
import { UserGroup } from "../interfaces/userGroup";

async function getAllUserGroups(req: Request, res: Response) {
    const groups = await UserGroupService.getAllUserGroups();
    return res.status(200).json(groups);
}

async function getUserGroupByName(req: Request, res: Response) {
    const { group_name: groupName } = req.body;
    const group = await UserGroupService.getUserGroupByName(groupName);
    return res.status(200).json(group);
}

//CREATE function 

async function createUserGroup(req: Request, res: Response) {
    const newGroup: UserGroup = req.body;
    
    await UserGroupService.createUserGroup(newGroup);
  
    return res.status(200).json("Successfully created");
  }



const UserGroupController = { getAllUserGroups, getUserGroupByName, createUserGroup };

export { UserGroupController };