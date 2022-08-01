import { prisma } from "../utils/prisma";
import { UserGroup } from "../interfaces/userGroup";

//GET functions

async function getAllUserGroups() {
  let allGroups;
  try {
    allGroups = await prisma.interest_groups.findMany();
  }
  catch (error) {
    console.log(error);
  }
  const groups: UserGroup[] = allGroups.map((x:
    { id: any; group_name: any; description: any; }) => ({
      groupId: x.id,
      groupName: x.group_name,
      description: x.description
    }));
  return groups;
}

async function getUserGroupByName(groupName: string) {
  let groupArray;
  try {
    groupArray = await prisma.interest_groups.findMany({
      where: { group_name: { contains: groupName, mode: "insensitive" } },
    });
  }
  catch (error) {
    console.log(error);
  }
  const groups : UserGroup[] = groupArray.map((x:
    { id: any; group_name: any; description: any; }) => ({
      groupId: x.id,
      groupName: x.group_name,
      description: x.description
    }));

  return groups;
}

  async function getUserGroupById(groupId: number) {
    let groupsObject;

    try {
      groupsObject = await prisma.interest_groups.findUnique({
        where: { id: groupId },
      });
    }
    catch (error) {
      console.log(error);
    }
  
    let returnedValue = {
      groupId: groupsObject.id,
      groupName: groupsObject.group_name,
      description: groupsObject.description
    }
    return returnedValue;
  }

//UPDATE function

async function updateUserGroup(group : UserGroup) {
  let updatedGroup;
  try {
    updatedGroup = await prisma.interest_groups.update({
      where: {
        id: group.groupId
      },
      data: {
        group_name: group.groupName,
        description: group.description
      },
    });
  }
  catch (error) {
    console.log(error);
  }
  return updatedGroup;
}

//CREATE function 

async function createUserGroup(group: UserGroup) {
  let newGroup;
  try {
    newGroup = await prisma.interest_groups.create({
      data: {
        group_name: group.groupName,
        description: group.description
      },
    });
  } catch (error) {
    console.log(error);
  }
  return newGroup;
}

//DELETE function

async function deleteUserGroupById(groupId: number) {
  let deletedGroup;
  try {
    deletedGroup = await prisma.interest_groups.delete({
      where: {
        id: groupId
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedGroup;
}


const UserGroupService = {
    getAllUserGroups,
    getUserGroupByName,
    getUserGroupById,
    updateUserGroup,
    createUserGroup,
    deleteUserGroupById
  };
  
  export { UserGroupService };