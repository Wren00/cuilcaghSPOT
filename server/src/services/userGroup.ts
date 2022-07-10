import { prisma } from "../utils/prisma";
import { UserGroup } from "../interfaces/userGroup";

//GET functions

async function getAllUserGroups() {

  const groups = prisma.interest_groups.findMany();

  return await groups;

}

async function getUserGroupByName(groupName: string) {
    const group = prisma.interest_groups.findMany({
      where: { group_name: { contains: groupName, mode: "insensitive" } },
    });
    return await group;
  }

  async function getUserGroupById(groupId: number) {
    const group = prisma.interest_groups.findMany({
      where: { id : groupId},
    });
    return await group;
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
    createUserGroup
  };
  
  export { UserGroupService };