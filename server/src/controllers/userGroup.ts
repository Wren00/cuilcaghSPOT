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

async function getUserGroupById(req: Request, res: Response) {

}

//UPDATE function

async function updateUserGroup(req: Request, res: Response) {
    try {
        const updateDetails: UserGroup = req.body;
        const updatedGroup = await UserGroupService.updateUserGroup(updateDetails);
        return res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json("Could not update group.");
    }
}

//CREATE function 

async function createUserGroup(req: Request, res: Response) {
    try{
    const newGroup: UserGroup = req.body;
    const createdGroup = await UserGroupService.createUserGroup(newGroup);
    return res.status(200).json(createdGroup);
    }catch(error) {
      res.status(500).json("Could not create group.");
    }
  }

//DELETE function

async function deleteUserGroupById(req: Request, res: Response) {
    const { groupId: groupId } = req.body;

    const deletedGroup = await UserGroupService.deleteUserGroupById(groupId);
    if (!deletedGroup) {
        return res.status(500).json("Cannot delete group");
    }
    return res.status(200).json(deletedGroup);
}

const UserGroupController = { getAllUserGroups, getUserGroupByName, updateUserGroup, createUserGroup, deleteUserGroupById };

export { UserGroupController };