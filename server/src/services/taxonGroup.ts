import { prisma } from "../utils/prisma";
import { TaxonGroup } from "../interfaces/taxonGroup";

//GET functions

async function getAllTaxonGroups() {

  const taxonGroups = prisma.taxon_groups.findMany();

  return await taxonGroups;

}

async function getTaxonGroupByName(taxonName: string) {
  const taxonGroups = prisma.taxon_groups.findMany({
    where: { taxon_group_name: { contains: taxonName, mode: "insensitive" } },
  });
  return await taxonGroups;
}

async function getTaxonGroupById(taxonId: number) {
  const taxonGroup = prisma.taxon_groups.findUnique({
    where: { id: taxonId },
  });
  return await taxonGroup;
}

//CREATE function

async function createTaxonGroup(taxonGroup: TaxonGroup) {
    const newTaxonGroup = await prisma.taxon_groups.create({
      data: {
        taxon_group_name: taxonGroup.taxonGroupName,
        description: taxonGroup.description
    },
  })
  }
  
  //DELETE function

async function deleteTaxonGroupById(taxonGroupId: number) {
    const deletedGroup = await prisma.taxon_groups.delete({
      where: {
        id: taxonGroupId
      },
    });
  }

  
  const TaxonGroupService = {
    getAllTaxonGroups,
    getTaxonGroupByName,
    getTaxonGroupById,
    createTaxonGroup,
    deleteTaxonGroupById
  };
  
  export { TaxonGroupService };