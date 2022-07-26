import { prisma } from "../utils/prisma";
import { ConfirmedSighting } from "../interfaces/confirmedSighting";

//GET functions

async function getAllConfirmedSightings() {

  const manyObjects =  await prisma.confirmed_sightings.findMany();
  const sightings: ConfirmedSighting[] = manyObjects.map((x: 
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; }) => ({
    sightingId: x.id,
    organismId: x.organism_id,
    userId: x.user_id,
    pictureURL: x.picture_url,
    date: x.date,
    lat: x.lat,
    long: x.long,

  }));
  return sightings;

}

async function getSightingsByOrganismId (organismId: number) {
  const manyObjects = await prisma.confirmed_sightings.findMany({
    where: { organism_id: organismId },
  });
  const sightings: ConfirmedSighting[] = manyObjects.map((x: 
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; }) => ({
    sightingId: x.id,
    organismId: x.organism_id,
    userId: x.user_id,
    pictureURL: x.picture_url,
    date: x.date,
    lat: x.lat,
    long: x.long,

  }));
  return sightings;
}

async function getSightingsByUserId(userId: number) {
  const manyObjects = await prisma.confirmed_sightings.findMany({
    where: { user_id: userId },
  });
  const sightings: ConfirmedSighting[] = manyObjects.map((x: 
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; }) => ({
    sightingId: x.id,
    organismId: x.organism_id,
    userId: x.user_id,
    pictureURL: x.picture_url,
    date: x.date,
    lat: x.lat,
    long: x.long,

  }));
  return sightings;
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