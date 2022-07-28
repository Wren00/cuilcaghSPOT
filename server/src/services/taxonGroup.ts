import { prisma } from "../utils/prisma";
import { TaxonGroup } from "../interfaces/taxonGroup";

//GET functions

async function getAllTaxonGroups() {
  let allTaxonGroups;
  try {
    allTaxonGroups = await prisma.taxon_groups.findMany();
  }
  catch (error) {
    console.log(error);
  }
  const groups: TaxonGroup[] = allTaxonGroups.map((x:
    { id: any; taxon_group_name: any; description: any; }) => ({
      taxonId: x.id,
      taxonGroupName: x.taxon_group_name,
      description: x.description
    }));
  return groups;
}

async function getTaxonGroupByName(taxonGroupName: string) {
  let taxonGroupObject;

  try {
    taxonGroupObject = await prisma.taxon_groups.findFirst({
      where: { taxon_group_name: { contains: taxonGroupName, mode: "insensitive" } },
    });
  }
  catch (error) {
    console.log(error);
  }

  let returnedValue = {
    taxonGroupId: taxonGroupObject.id,
    taxonGroupName: taxonGroupObject.taxon_group_name,
    description: taxonGroupObject.description
  }
  return returnedValue;
}

async function getTaxonGroupById(taxonGroupId: number) {
  let taxonGroupObject;

  try {
    taxonGroupObject = await prisma.taxon_groups.findUnique({
      where: { id : taxonGroupId },
     });
  }
  catch (error) {
    console.log(error);
  }

  let returnedValue = {
    taxonGroupId: taxonGroupObject.id,
    taxonGroupName: taxonGroupObject.taxon_group_name,
    description: taxonGroupObject.description
  }
  return returnedValue;
}

//CREATE function

async function createTaxonGroup(taxonGroup: TaxonGroup) {
  let newTaxonGroup;
  try {
    newTaxonGroup = await prisma.taxon_groups.create({
      data: {
        taxon_group_name: taxonGroup.taxonGroupName,
        description: taxonGroup.description
      },
    });
  } catch (error) {
    console.log(error);
  }
  return newTaxonGroup;
}
  
  //DELETE function

async function deleteTaxonGroupById(taxonGroupId: number) {
  let deletedGroup;
  try {
    deletedGroup = await prisma.taxon_groups.delete({
      where: {
        id: taxonGroupId
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedGroup;
}

  
  const TaxonGroupService = {
    getAllTaxonGroups,
    getTaxonGroupByName,
    getTaxonGroupById,
    createTaxonGroup,
    deleteTaxonGroupById
  };
  
  export { TaxonGroupService };