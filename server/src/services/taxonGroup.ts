import { prisma } from "../utils";
import { TaxonGroup } from "../interfaces/taxonGroup";

//GET functions
async function getAllTaxonGroups() {
  const allTaxonGroups = await prisma.taxon_groups.findMany();
  const groups: TaxonGroup[] = allTaxonGroups.map((x: { id: any; taxon_group_name: any; description: any }) => ({
    taxonId: x.id,
    taxonGroupName: x.taxon_group_name,
    description: x.description,
  }));
  return groups;
}

async function getTaxonGroupByName(taxonGroupName: string) {
  let taxonGroupArray;
  try {
    taxonGroupArray = await prisma.taxon_groups.findMany({
      where: { taxon_group_name: { contains: taxonGroupName, mode: "insensitive" } },
    });
  } catch (error) {
    return error;
  }
  const taxonGroups: TaxonGroup[] = taxonGroupArray.map((x: { id: any; taxon_group_name: any; description: any }) => ({
    taxonGroupId: x.id,
    taxonGroupName: x.taxon_group_name,
    description: x.description,
  }));

  if (taxonGroups.length === 0) {
    return "Cannot find name";
  }
  return taxonGroups;
}

async function getTaxonGroupById(taxonGroupId: number) {
  const taxonGroupObject = await prisma.taxon_groups.findUnique({
    where: { id: taxonGroupId },
  });

  const returnedValue = {
    taxonGroupId: taxonGroupObject.id,
    taxonGroupName: taxonGroupObject.taxon_group_name,
    description: taxonGroupObject.description,
  };

  return returnedValue;
}

//CREATE function

async function createTaxonGroup(taxonGroup: TaxonGroup) {
  let newTaxonGroup;
  try {
    newTaxonGroup = await prisma.taxon_groups.create({
      data: {
        taxon_group_name: taxonGroup.taxonGroupName,
        description: taxonGroup.description,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
  return newTaxonGroup;
}

//DELETE function
async function deleteTaxonGroupById(taxonGroupId: number) {
  let deletedGroup;
  try {
    deletedGroup = await prisma.taxon_groups.delete({
      where: {
        id: taxonGroupId,
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
  deleteTaxonGroupById,
};

export { TaxonGroupService };
