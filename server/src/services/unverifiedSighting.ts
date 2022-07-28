import { prisma } from "../utils/prisma";
import { Prisma, unverified_sightings } from "@prisma/client";
import { UnverifiedSighting } from "../interfaces/unverifiedSighting";
import { parse } from "path";

//GET functions

async function getAllUnverifiedSightings() {
  let allSightings;
  try {
    allSightings = await prisma.unverified_sightings.findMany();
  }
  catch (error) {
    console.log(error);
  }
  const getAllSightings: UnverifiedSighting[] = allSightings.map((x => ({
    sightingId: x.id,
    organismId: x.organism_id,
    userId: x.user_id,
    pictureURL: x.picture_url,
    date: x.date.toString(),
    lat: (x.lat).toNumber(),
    long: (x.long).toNumber(),
    userVotes: x.user_vote_id,
    userReactions: x.reaction_id

  })));

  return getAllSightings;

}

async function getSightingsByOrganismId(organismId: number) {
  //return all unverified sightings of an organism
  let sightingsArray;
  try {
    sightingsArray = await prisma.unverified_sightings.findMany({
      where: { organism_id: organismId },
    });
  }
  catch (error) {
    console.log(error);
  }
  const allSightings: UnverifiedSighting[] = sightingsArray.map((x:
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; user_vote_id: any; reaction_id: any; }) => ({
      sightingId: x.id,
      organismId: x.organism_id,
      userId: x.user_id,
      pictureURL: x.picture_url,
      date: x.date,
      lat: x.lat,
      long: x.long,
      userVotes: x.user_vote_id,
      userReactions: x.reaction_id
    }));
  return allSightings;
}


async function getSightingsByUserId(userId: number) {
  //return all unverified sightings made by a user
  let sightingsArray;
  try {
    sightingsArray = await prisma.unverified_sightings.findMany({
      where: { user_id: userId },
    });
  }
  catch (error) {
    console.log(error);
  }
  const allSightings: UnverifiedSighting[] = sightingsArray.map((x:
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; user_vote_id: any; reaction_id: any; }) => ({
      sightingId: x.id,
      organismId: x.organism_id,
      userId: x.user_id,
      pictureURL: x.picture_url,
      date: x.date,
      lat: x.lat,
      long: x.long,
      userVotes: x.user_vote_id,
      userReactions: x.reaction_id
    }));
  return allSightings;
}


//CREATE function

async function createUnverifiedSighting(sighting: UnverifiedSighting) {

  let newSighting;
  try {
    newSighting = await prisma.unverified_sightings.create({
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
  return newSighting;
}

//UPDATE function

async function updateSighting(sighting : UnverifiedSighting) {

  let updatedSighting;
  try {
    updatedSighting= await prisma.unverified_sightings.update({
      where: {
        id: sighting.sightingId
      },
      data: {
        organism_id: sighting.organismId
      },
    });
  }
  catch (error) {
    console.log(error);
  }
  return updatedSighting;
}

//DELETE function

async function deleteUnverifiedSightingById(sightingId: number) {
  let deletedSighting;
  try {
    deletedSighting = await prisma.unverified_sightings.delete({
      where: {
        id: sightingId
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedSighting;
}

const UnverifiedSightingService = {
  getAllUnverifiedSightings,
  getSightingsByOrganismId,
  getSightingsByUserId,
  createUnverifiedSighting,
  updateSighting,
  deleteUnverifiedSightingById
};

export { UnverifiedSightingService };