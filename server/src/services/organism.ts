import { prisma } from "../utils/prisma";
import { Organism, CreateOrganism} from "../interfaces/organism";

//GET functions

//all users can access these functions

async function getAllOrganisms() {

  const manyObjects =  await prisma.organisms.findMany();
  const organisms: Organism[] = manyObjects.map((x: 
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
  const manyObjects =  await prisma.organisms.findMany({
    where: { taxon_name: { contains: taxonName, mode: "insensitive" } },
  });
  const organisms: Organism[] = manyObjects.map((x: 
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
  const organismObject =  await prisma.organisms.findUnique({
    where: { id: organismId },
  });

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
  const manyObjects =  await prisma.organisms.findMany({
    where: { taxon_group_id: taxonId },
  });
  const organisms: Organism[] = manyObjects.map((x: 
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

//admin or trusted users can access these functions

//UPDATE function

async function updateOrganism(organism: Organism)   {
  console.log(organism);
  const updatedOrganism = await prisma.organisms.update({
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
  

//CREATE function

async function createOrganism(organism: CreateOrganism) {
  console.log(organism);
  const newOrganism = await prisma.organisms.create({
    data: {
      taxon_name: organism.taxonName,
      latin_name: organism.latinName,
      taxon_group_id: organism.taxonGroupId,
      picture_url: organism.pictureURL,
      description: organism.description
  },
})
}


//DELETE function

async function deleteOrganismById(organismId: number) {
  const deletedOrganism = await prisma.organisms.delete({
    where: {
      id: organismId
    },
  });
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




