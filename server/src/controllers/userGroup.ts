import { Request, Response } from "express";
import { UserGroupService } from "../services/userGroup";
import { UserGroup } from "../interfaces/userGroup";

async function getAllUserGroups(req: Request, res: Response) {
  try {
    const groups = await UserGroupService.getAllUserGroups();
    return res.status(200).json(groups);
  } catch (error) {
    res.status(401).json("Cannot access database");
  }
}

async function getUserGroupByName(req: Request, res: Response) {
  try {
    const { groupName: groupName } = req.body;
    const groups = await UserGroupService.getUserGroupByName(groupName);
    return res.status(200).json(groups);
  } catch (error) {
    res.status(401).json("Cannot find group name");
  }
}

async function getUserGroupById(req: Request, res: Response) {
  try {
    const groupId = parseInt(req.params["id"]);
    const group = await UserGroupService.getUserGroupById(groupId);
    return res.status(200).json(group);
  } catch (error) {
    res.status(401).json("Cannot find group id");
  }
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
  try {
    const newGroup: UserGroup = req.body;
    const createdGroup = await UserGroupService.createUserGroup(newGroup);
    return res.status(200).json(createdGroup);
  } catch (error) {
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

const UserGroupController = {
  getAllUserGroups,
  getUserGroupByName,
  getUserGroupById,
  updateUserGroup,
  createUserGroup,
  deleteUserGroupById,
};

export { UserGroupController };
