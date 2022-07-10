import { prisma } from "../utils/prisma";
import { Organism} from "../interfaces/organism";

//GET functions

async function getAllOrganisms() {

  const organisms = prisma.organisms.findMany();

  return await organisms;

}

async function getOrganismByName(organismName: string) {
  const organisms = prisma.organisms.findMany({
    where: { taxon_name: { contains: organismName, mode: "insensitive" } },
  });
  return await organisms;
}

async function getOrganismById(organismId: number) {
  const organism = prisma.organisms.findUnique({
    where: { id: organismId },
  });
  return await organism;
}

async function getOrganismByTaxonGroupId(taxonId: number) {
  const organisms = prisma.organisms.findMany({
    where: { taxon_group_id: taxonId },
  });
  return await organisms;
}

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

async function createOrganism(organism: Organism) {
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




