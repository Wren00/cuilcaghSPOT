import { prisma } from "../utils/prisma";
import { ConfirmedSighting } from "../interfaces/confirmedSighting";

//GET functions
async function getAllConfirmedSightings() {
  let allSightings;
  try {
    allSightings = await prisma.confirmed_sightings.findMany();
  }
  catch (error) {
    console.log(error);
  }
  const sightings: ConfirmedSighting[] = allSightings.map((x:
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; user_vote_id: any; reaction_id: any; }) => ({
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

async function getSightingsByOrganismId(organismId: number) {
  let sightingsArray;
  try {
    sightingsArray = await prisma.confirmed_sightings.findMany({
      where: { organism_id: organismId },
    });
  }
  catch (error) {
    console.log(error);
  }
  const allSightings: ConfirmedSighting[] = sightingsArray.map((x:
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; user_vote_id: any; reaction_id: any; }) => ({
      sightingId: x.id,
      organismId: x.organism_id,
      userId: x.user_id,
      pictureURL: x.picture_url,
      date: x.date,
      lat: x.lat,
      long: x.long,

    }));
  return allSightings;
}

async function getSightingsByUserId(userId: number) {
  let sightingsArray;
  try {
    sightingsArray = await prisma.confirmed_sightings.findMany({
      where: { user_id: userId },
    });
  }
  catch (error) {
    console.log(error);
  }
  const allSightings: ConfirmedSighting[] = sightingsArray.map((x:
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; user_vote_id: any; reaction_id: any; }) => ({
      sightingId: x.id,
      organismId: x.organism_id,
      userId: x.user_id,
      pictureURL: x.picture_url,
      date: x.date,
      lat: x.lat,
      long: x.long,
    }));
  return allSightings;
}

//CREATE functions

async function createConfirmedSighting(sighting: ConfirmedSighting) {
  let newSighting;
  try {
    newSighting = await prisma.confirmed_sightings.create({
      data: {
        organism_id: sighting.organismId,
        user_id: sighting.userId,
        picture_url: sighting.pictureURL,
        date: sighting.date,
        lat: sighting.lat,
        long: sighting.long,
      },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(newSighting);
  return newSighting;
}

//DELETE function

async function deleteConfirmedSightingById(sightingId: number) {
  let deletedSighting;
  try {
    deletedSighting = await prisma.confirmed_sightings.delete({
      where: {
        id: sightingId
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedSighting;
}

const ConfirmedSightingService = {
  getAllConfirmedSightings,
  getSightingsByOrganismId,
  getSightingsByUserId,
  createConfirmedSighting,
  deleteConfirmedSightingById
};

export { ConfirmedSightingService };