import express, { Request, Response } from 'express';
import { UnverifiedSightingService } from "../services/unverifiedSighting";
import { UnverifiedSighting } from "../interfaces/unverifiedSighting";


//GET functions

//all users can access these functions

async function getAllUnverifiedSightings(req: Request, res: Response) {
  try {
    const sightings = await UnverifiedSightingService.getAllUnverifiedSightings();
    return res.status(200).json(sightings);
  } catch (error) {
    res.status(401).json("Cannot GET sightings");
  }
}
//admin users can access these functions

async function getSightingsByOrganismId(req: Request, res: Response) {
  try {
    const { organismId: organismId } = req.body;
    const sightings = await UnverifiedSightingService.getSightingsByOrganismId(organismId);
    return res.status(200).json(sightings);
  } catch (error) {
    res.status(401).json("Cannot find organism Id");
  }
}

async function getSightingsByUserId(req: Request, res: Response) {
  try {
    const { userId: userId } = req.body;
    const sightings = await UnverifiedSightingService.getSightingsByUserId(userId);
    return res.status(200).json(sightings);
  } catch (error) {
    res.status(401).json("Cannot find user Id");
  }
}

//CREATE function

async function createUnverifiedSighting(req: Request, res: Response) {
  try {
    const newSighting: UnverifiedSighting = req.body;
    const createdSighting = await UnverifiedSightingService.createUnverifiedSighting(newSighting);
    return res.status(200).json(createdSighting);
  } catch (error) {
    res.status(500).json("Could not create sighting.");
  }
}

//UPDATE function

async function updateSighting(req: Request, res: Response) {
  try{
    const updateDetails: UnverifiedSighting = req.body;
    const updatedSighting = await UnverifiedSightingService.updateSighting(updateDetails);
    return res.status(200).json(updatedSighting);
    }catch(error) {
      res.status(500).json("Could not update sighting.");
    }
  }

//DELETE function

async function deleteUnverifiedSightingById(req: Request, res: Response) {
  const { sightingId: sightingId } = req.body;

  const deletedSighting = await UnverifiedSightingService.deleteUnverifiedSightingById(sightingId);
  if (!deletedSighting) {
    return res.status(500).json("Cannot delete sighting");
  }
  return res.status(200).json(deletedSighting);
}

const UnverifiedSightingController = {
  getAllUnverifiedSightings,
  getSightingsByOrganismId,
  getSightingsByUserId,
  createUnverifiedSighting,
  updateSighting,
  deleteUnverifiedSightingById
};

export { UnverifiedSightingController };