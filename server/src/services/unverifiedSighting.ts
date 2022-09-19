import { prisma } from "../utils";
import { UnverifiedSighting } from "../interfaces/unverifiedSighting";

//GET functions

async function getAllUnverifiedSightings() {
  let sighting;
  let allSightings;
  try {
    allSightings = await prisma.unverified_sightings.findMany();
  } catch (error) {
    console.log(error);
  }
  const getAllSightings: UnverifiedSighting[] = allSightings.map((x) => ({
    sightingId: x.id,
    organismId: x.organism_id,
    userId: x.user_id,
    pictureUrl: x.picture_url,
    date: x.date,
    lat: x.lat.toNumber(),
    long: x.long.toNumber(),
    userVotes: x.user_votes
  }));

  for (sighting of getAllSightings) {
    const organism = await prisma.organisms.findUnique({
      where: {
        id: sighting.organismId,
      },
    });
    sighting.organismName = organism.taxon_name;
  }

  for (sighting of getAllSightings) {
    const user = await prisma.users.findUnique({
      where: {
        id: sighting.userId,
      },
    });
    sighting.userName = user.user_name;
  }
  return getAllSightings;
}

async function getSightingsById(sightingId: number) {
  let sightingObject;
  let user;
  let organism;

  try {
    sightingObject = await prisma.unverified_sightings.findUnique({
      where: { id: sightingId },
    });

    console.log(sightingObject);

    user = await prisma.users.findUnique({
      where: {
        id: sightingObject.user_id
      },
    });
    sightingObject.userName = user.user_name;

    organism = await prisma.organisms.findUnique({
      where: {
        id: sightingObject.organism_id
      },
    });
    sightingObject.organismName = organism.taxon_name;

  } catch (error) {
    console.log(error);
  }

  const returnedValue : UnverifiedSighting = {
    sightingId: sightingObject.id,
    organismId: +sightingObject.organism_id,
    userId: +sightingObject.user_id,
    pictureUrl: sightingObject.picture_url,
    date: sightingObject.date,
    lat: sightingObject.lat.toNumber(),
    long: sightingObject.long.toNumber(),
    userVotes: sightingObject.user_votes,
    organismName: sightingObject.organismName,
    userName: sightingObject.userName

  };

  return returnedValue;
}

async function getSightingsByOrganismId(organismId: number) {
  //return all unverified sightings of an organism
  let sightingsArray;
  try {
    sightingsArray = await prisma.unverified_sightings.findMany({
      where: { organism_id: organismId },
    });
  } catch (error) {
    console.log(error);
  }
  const allSightings: UnverifiedSighting[] = sightingsArray.map(
    (x: {
      id: any;
      organism_id: any;
      user_id: any;
      picture_url: any;
      date: any;
      lat: any;
      long: any;
      user_votes: any;
    }) => ({
      sightingId: x.id,
      organismId: x.organism_id,
      userId: x.user_id,
      pictureUrl: x.picture_url,
      date: x.date,
      lat: x.lat,
      long: x.long,
      userVotes: x.user_votes
    })
  );
  return allSightings;
}

async function getSightingsByUserId(userId: number) {
  //return all unverified sightings made by a user
  let sightingsArray;
  try {
    sightingsArray = await prisma.unverified_sightings.findMany({
      where: { user_id: userId },
    });
  } catch (error) {
    console.log(error);
  }
  const allSightings: UnverifiedSighting[] = sightingsArray.map(
    (x: {
      id: any;
      organism_id: any;
      user_id: any;
      picture_url: any;
      date: any;
      lat: any;
      long: any;
      user_votes: any;
    }) => ({
      sightingId: x.id,
      organismId: x.organism_id,
      userId: x.user_id,
      pictureUrl: x.picture_url,
      date: x.date,
      lat: x.lat,
      long: x.long,
      userVotes: x.user_votes
    })
  );
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
        picture_url: sighting.pictureUrl,
        date: new Date(sighting.date),
        lat: sighting.lat,
        long: sighting.long,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
  return newSighting;
}

//UPDATE function - will work for adding reactions and user votes.

async function updateSighting(sighting: UnverifiedSighting) {
  let updatedSighting;
  try {
    updatedSighting = await prisma.unverified_sightings.update({
      where: {
        id: sighting.sightingId,
      },
      data: {
        organism_id: sighting.organismId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updatedSighting;
}

async function incrementUserVote(sightingId: number) {
  let updatedVote;
  try {
    updatedVote = await prisma.unverified_sightings.update({
      where: {
        id: sightingId,
      },
      data: {
        user_votes: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updatedVote;
}

async function decrementUserVote(sightingId: number) {
  let updatedVote;
  try {
    updatedVote = await prisma.unverified_sightings.update({
      where: {
        id: sightingId,
      },
      data: {
        user_votes: {
          decrement: 1,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updatedVote;
}

//DELETE function

async function deleteUnverifiedSightingById(sightingId: number) {
  let deletedSighting;
  try {
    deletedSighting = await prisma.unverified_sightings.delete({
      where: {
        id: sightingId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedSighting;
}

const UnverifiedSightingService = {
  getAllUnverifiedSightings,
  getSightingsById,
  getSightingsByOrganismId,
  getSightingsByUserId,
  createUnverifiedSighting,
  updateSighting,
  incrementUserVote,
  decrementUserVote,
  deleteUnverifiedSightingById,
};

export { UnverifiedSightingService };
