import { prisma } from "../utils/prisma";
import { Organism, CreateOrganism } from "../interfaces/organism";

//GET functions

//all users can access these functions

async function getAllOrganisms() {
  let allOrganisms;
  try {
    allOrganisms = await prisma.organisms.findMany();
  }
  catch (error) {
    console.log(error);
  }
  const organisms: Organism[] = allOrganisms.map((x:
    { id: any; taxon_name: any; latin_name: any; taxon_group_id: any; picture_url: any; description: any; }) => ({
      organismId: x.id,
      taxonName: x.taxon_name,
      latinName: x.latin_name,
      taxonGroupId: x.taxon_group_id,
      pictureURL: x.picture_url,
      description: x.description
    }));
  return organisms;
}

async function getOrganismByName(taxonName: string) {
  let organismArray;
  try {
    organismArray = await prisma.organisms.findMany({
      where: { taxon_name: { contains: taxonName, mode: "insensitive" } },
    });
  }
  catch (error) {
    console.log(error);
  }
  const organisms: Organism[] = organismArray.map((x:
    { id: any; taxon_name: any; latin_name: any; taxon_group_id: any; picture_url: any; description: any; }) => ({
      organismId: x.id,
      taxonName: x.taxon_name,
      latinName: x.latin_name,
      taxonGroupId: x.taxon_group_id,
      pictureURL: x.picture_url,
      description: x.description
    }));

  return organisms;
}

//all admin users can access these functions

async function getOrganismById(organismId: number) {
  let organismObject;

  try {
    organismObject = await prisma.organisms.findUnique({
      where: { id: organismId },
    });
  }
  catch (error) {
    console.log(error);
  }

  let returnedValue = {
    organismId: organismObject.id,
    taxonName: organismObject.taxon_name,
    latinName: organismObject.latin_name,
    taxonGroupId: organismObject.taxon_group_id,
    pictureUrl: organismObject.picture_url,
    description: organismObject.description
  }
  return returnedValue;
}

async function getOrganismByTaxonGroupId(taxonId: number) {

  let organismArray;

  try {
    await prisma.organisms.findMany({
      where: { taxon_group_id: taxonId },
    });
  }
  catch (error) {
    console.log(error);
  }
  organismArray = organismArray.map((x:
    { id: any; taxon_name: any; latin_name: any; taxon_group_id: any; picture_url: any; description: any; }) => ({
      organismId: x.id,
      taxonName: x.taxon_name,
      latinName: x.latin_name,
      taxonGroupId: x.taxon_group_id,
      pictureURL: x.picture_url,
      description: x.description
    }));
  console.log(organismArray);
  return organismArray;
}

//admin or trusted users can access these functions

//UPDATE function

async function updateOrganism(organism: Organism) {

  let updatedOrganism;
  try {
    updatedOrganism = await prisma.organisms.update({
      where: {
        id: organism.organismId
      },
      data: {
        taxon_name: organism.taxonName,
        description: organism.description,
        picture_url: organism.pictureURL
      },
    });
  }
  catch (error) {
    console.log(error);
  }
  return updatedOrganism;
}


//CREATE function

async function createOrganism(organism: CreateOrganism) {
  let newOrganism;
  try {
    newOrganism = await prisma.organisms.create({
      data: {
        taxon_name: organism.taxonName,
        latin_name: organism.latinName,
        taxon_group_id: organism.taxonGroupId,
        picture_url: organism.pictureURL,
        description: organism.description
      },
    });
  } catch (error) {
    console.log(error);
  }
  return newOrganism;
}


//DELETE function

async function deleteOrganismById(organismId: number) {
  let deletedOrganism;
  try {
    deletedOrganism = await prisma.organisms.delete({
      where: {
        id: organismId
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedOrganism;
}

const OrganismService = {
  getAllOrganisms,
  getOrganismByName,
  getOrganismById,
  getOrganismByTaxonGroupId,
  deleteOrganismById,
  createOrganism,
  updateOrganism
};

export { OrganismService };




