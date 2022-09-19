import {prisma} from "../utils";
import {ConfirmedSighting} from "../interfaces/confirmedSighting";

//GET functions
async function getAllConfirmedSightings() {
    let sighting;
    let allSightings;
    try {
        allSightings = await prisma.confirmed_sightings.findMany();
    } catch (error) {
        console.log(error);
    }
    console.log(allSightings[0].date);
    const getAllSightings: ConfirmedSighting[] = allSightings.map((x) => ({
        sightingId: x.id,
        organismId: x.organism_id,
        userId: x.user_id,
        pictureUrl: x.picture_url,
        date: x.date,
        lat: x.lat.toNumber(),
        long: x.long.toNumber(),
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

async function getConfirmedSightingById(sightingId: number) {
    let sightingObject;
    let user;
    let organism;

    try {
        sightingObject = await prisma.confirmed_sightings.findUnique({
            where: { id: sightingId },
        });

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

    const returnedValue : ConfirmedSighting = {
        sightingId: sightingObject.id,
        organismId: +sightingObject.organism_id,
        userId: +sightingObject.user_id,
        pictureUrl: sightingObject.picture_url,
        date: sightingObject.date,
        lat: sightingObject.lat,
        long: sightingObject.long,
        organismName: sightingObject.organismName,
        userName: sightingObject.userName
    };

    return returnedValue;
}

async function getSightingsByOrganismId(organismId: number) {
    let sightingsArray;
    try {
        sightingsArray = await prisma.confirmed_sightings.findMany({
            where: {organism_id: organismId},
        });
    } catch (error) {
        console.log(error);
    }
    const allSightings: ConfirmedSighting[] = sightingsArray.map(
        (x: {
            id: any;
            organism_id: any;
            user_id: any;
            picture_url: any;
            date: any;
            lat: any;
            long: any;
            user_votes: any;
            reaction_id: any;
        }) => ({
            sightingId: x.id,
            organismId: x.organism_id,
            userId: x.user_id,
            pictureUrl: x.picture_url,
            date: x.date,
            lat: x.lat,
            long: x.long,
        })
    );
    return allSightings;
}

async function getSightingsByUserId(userId: number) {
    let sightingsArray;
    try {
        sightingsArray = await prisma.confirmed_sightings.findMany({
            where: {user_id: userId},
        });
    } catch (error) {
        console.log(error);
    }
    const allSightings: ConfirmedSighting[] = sightingsArray.map(
        (x: {
            id: any;
            organism_id: any;
            user_id: any;
            picture_url: any;
            date: any;
            lat: any;
            long: any;
            user_votes: any;
            reaction_id: any;
        }) => ({
            sightingId: x.id,
            organismId: x.organism_id,
            userId: x.user_id,
            pictureUrl: x.picture_url,
            date: x.date,
            lat: x.lat,
            long: x.long,
        })
    );
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
                picture_url: sighting.pictureUrl,
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

//DELETE function

async function deleteConfirmedSightingById(sightingId: number) {
    let deletedSighting;
    try {
        deletedSighting = await prisma.confirmed_sightings.delete({
            where: {
                id: sightingId,
            },
        });
    } catch (error) {
        console.log(error);
    }
    return deletedSighting;
}

const ConfirmedSightingService = {
    getAllConfirmedSightings,
    getConfirmedSightingById,
    getSightingsByOrganismId,
    getSightingsByUserId,
    createConfirmedSighting,
    deleteConfirmedSightingById,
};

export {ConfirmedSightingService};
