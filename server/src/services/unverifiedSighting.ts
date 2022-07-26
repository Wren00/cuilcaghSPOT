import { prisma } from "../utils/prisma";
import { Prisma, unverified_sightings } from "@prisma/client";
import { UnverifiedSighting } from "../interfaces/unverifiedSighting";
import { parse } from "path";

//GET functions

async function getAllUnverifiedSightings() {
  const manyObjects =  await prisma.unverified_sightings.findMany();
  const sightings: UnverifiedSighting[] = manyObjects.map((x: 
    { id: any; organism_id: any; user_id: any; picture_url: any; date: any; lat: any; long: any; user_vote_id: any; reaction_id: any; }) => ({
    sightingId: x.id,
    organismId: x.organism_id,
    userId: x.user_id,
    pictureURL: x.picture_url,
    date: x.date.toString(),
    lat: Number(x.lat),
    long: Number(x.long),
    userVotes: x.user_vote_id,
    userReactions: x.reaction_id

  }));

  return sightings;

}

async function getSightingsByOrganismId (organismId: number) {

    const manyObjects = await prisma.unverified_sightings.findMany({
      where: { organism_id: organismId },
    });
    const sightings: UnverifiedSighting[] = manyObjects.map((x: 
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
    return sightings;
  }
  
  async function getSightingsByUserId(userId: number) {
    const manyObjects = await prisma.unverified_sightings.findMany({
      where: { user_id: userId },
    });
    const sightings: UnverifiedSighting[] = manyObjects.map((x: 
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
    return sightings;
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