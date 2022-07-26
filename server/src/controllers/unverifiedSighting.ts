import express, { Request, Response } from 'express';
import { UnverifiedSightingService } from "../services/unverifiedSighting";
import { UnverifiedSighting } from "../interfaces/unverifiedSighting";


//GET functions

//all users can access these functions

async function getAllUnverifiedSightings(req: Request, res: Response) {
  const sightings = await UnverifiedSightingService.getAllUnverifiedSightings();
  return res.status(200).json(sightings);
}

//admin users can access these functions

async function getSightingsByOrganismId(req: Request, res: Response) {
  try {
  const { organismId: organismId } = req.body;
  const sightings = await UnverifiedSightingService.getSightingsByOrganismId(organismId);
  return res.status(200).json(sightings);
  } catch(error)  {
    res.status(401).json("Cannot find organism Id");
  }
}

async function getSightingsByUserId(req: Request, res: Response) {
  const { userId: userId } = req.body;
  const sightings = await UnverifiedSightingService.getSightingsByUserId(userId);
  return res.status(200).json(sightings);
}

//CREATE function

async function createUnverifiedSighting(req: Request, res: Response) {
  const newSighting: UnverifiedSighting = req.body;

  await UnverifiedSightingService.createUnverifiedSighting(newSighting);

  return res.status(200).json("Successfully created");
}

//DELETE function

async function deleteSightingById(req: Request, res: Response)    {
  const { id: sightingId } = req.body;

  const sighting = await UnverifiedSightingService.deleteSightingById(sightingId);

  return res.status(200).json("Successfully deleted");
}

const UnverifiedSightingController = {
  getAllUnverifiedSightings,
  getSightingsByOrganismId,
  getSightingsByUserId,
  createUnverifiedSighting,
  deleteSightingById
};

export { UnverifiedSightingController };