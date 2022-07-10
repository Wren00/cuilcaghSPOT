import { prisma } from "../utils/prisma";
import { UnverifiedSighting } from "../interfaces/unverifiedSighting";

//GET functions

async function getAllUnverifiedSightings() {

  const unverifiedSighting = prisma.unverified_sightings.findMany();

  return await unverifiedSighting;

}

async function getSightingsByOrganismId (organismId: number) {
    const sighting = prisma.unverified_sightings.findMany({
      where: { organism_id: organismId },
    });
    return await sighting;
  }
  
  async function getSightingsByUserId(userId: number) {
    const sightings = prisma.unverified_sightings.findMany({
      where: { user_id: userId },
    });
    return await sightings;
  }


//CREATE function

async function createUnverifiedSighting(sighting: UnverifiedSighting) {
  const newSighting = await prisma.unverified_sightings.create({
    data: {
      organism_id: sighting.organismId,
      user_id: sighting.userId,
      picture_url: sighting.pictureURL,
      date: sighting.date,
      lat: sighting.lat,
      long: sighting.long
  },
})
}

//DELETE function

async function deleteSightingById(sightingId: number) {
  const deletedSighting = await prisma.unverified_sightings.delete({
    where: {
      id: sightingId
    },
  });
}

const UnverifiedSightingService = {
    getAllUnverifiedSightings,
    getSightingsByOrganismId,
    getSightingsByUserId,
    createUnverifiedSighting,
    deleteSightingById
  };
  
  export { UnverifiedSightingService };