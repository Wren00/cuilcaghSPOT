import { prisma } from "../utils/prisma";
import { ConfirmedSighting } from "../interfaces/confirmedSighting";

//GET functions

async function getAllConfirmedSightings() {

  const confirmedSighting = prisma.confirmed_sightings.findMany();

  return await confirmedSighting;

}

async function getSightingsByOrganismId (organismId: number) {
  const sighting = prisma.confirmed_sightings.findMany({
    where: { organism_id: organismId },
  });
  return await sighting;
}

async function getSightingsByUserId(userId: number) {
  const sightings = prisma.confirmed_sightings.findMany({
    where: { user_id: userId },
  });
  return await sightings;
}

//CREATE functions

async function createConfirmedSighting(sighting: ConfirmedSighting) {
  const confirmedSighting = await prisma.confirmed_sightings.create({
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
  const deletedSighting = await prisma.confirmed_sightings.delete({
    where: {
      id: sightingId
    },
  });
}

const ConfirmedSightingService = {
    getAllConfirmedSightings,
    getSightingsByOrganismId,
    getSightingsByUserId,
    createConfirmedSighting,
    deleteSightingById
  };
  
  export { ConfirmedSightingService };