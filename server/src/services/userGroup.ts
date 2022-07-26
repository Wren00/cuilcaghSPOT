import { prisma } from "../utils/prisma";
import { UserGroup } from "../interfaces/userGroup";

//GET functions

async function getAllUserGroups() {

  const manyObjects = await prisma.interest_groups.findMany();
  const groups: UserGroup[] = manyObjects.map((x: 
    { id: any; group_name: any; description: any; }) => ({
    groupId: x.id,
    groupName: x.group_name,
    description: x.description
  }));
  return groups;

}

async function getUserGroupByName(groupName: string) {
    const manyObjects = await prisma.interest_groups.findMany({
      where: { group_name: { contains: groupName, mode: "insensitive" } },
    });
    const groups: UserGroup[] = manyObjects.map((x: 
      { id: any; group_name: any; description: any; }) => ({
      groupId: x.id,
      groupName: x.group_name,
      description: x.description
    }));
    return groups;
  }

  async function getUserGroupById(groupId: number) {
    const groupObject = await prisma.interest_groups.findUnique({
      where: { id : groupId},
    });
    let returnedValue = {
      groupId: groupObject.id,
      groupName: groupObject.group_name,
      description: groupObject.description
    }
    return returnedValue;
  }

//CREATE function 

async function createUserGroup(group: UserGroup) {
    const newGroup = await prisma.interest_groups.create({
      data: {
        group_name: group.groupName,
        description: group.description
    },
  })
  }

//DELETE function 


const UserGroupService = {
    getAllUserGroups,
    getUserGroupByName,
    getUserGroupById,
    createUserGroup
  };
  
  export { UserGroupService };