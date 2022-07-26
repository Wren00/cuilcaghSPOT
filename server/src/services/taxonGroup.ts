import { prisma } from "../utils/prisma";
import { TaxonGroup } from "../interfaces/taxonGroup";

//GET functions

async function getAllTaxonGroups() {

  const manyObjects =  await prisma.taxon_groups.findMany();
  const taxonGroups: TaxonGroup[] = manyObjects.map((x: { id: any; taxon_group_name: any; description: any; }) => ({
    id: x.id,
    taxonGroupName: x.taxon_group_name,
    description: x.description
  }));
  return taxonGroups;

}

async function getTaxonGroupByName(taxonName: string) {
  const manyObjects =  await prisma.taxon_groups.findMany({
    where: { taxon_group_name: { contains: taxonName, mode: "insensitive" } },
  });
  const taxonGroups: TaxonGroup[] = manyObjects.map((x: { id: any; taxon_group_name: any; description: any; }) => ({
    id: x.id,
    taxonGroupName: x.taxon_group_name,
    description: x.description

  }));
  return taxonGroups;
}

async function getTaxonGroupById(taxonGroupId: number) {
  const taxonGroupObject =  await prisma.taxon_groups.findUnique({
    where: { id: taxonGroupId },
  });

  let returnedValue = {
    taxonId: taxonGroupObject.id,
    taxonGroupName: taxonGroupObject.taxon_group_name,
    description: taxonGroupObject.description
  }

  return returnedValue;
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