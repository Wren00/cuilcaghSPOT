import express, { Request, Response } from 'express';
import { ConfirmedSightingService } from "../services/confirmedSighting";
import { ConfirmedSighting } from "../interfaces/confirmedSighting";



async function getAllConfirmedSightings(req: Request, res: Response) {
  const sightings = await ConfirmedSightingService.getAllConfirmedSightings();
  return res.status(200).json(sightings);
}

async function getSightingsByOrganismId(req: Request, res: Response) {
  const { organism_id: organismId } = req.body;
  const sightings = await ConfirmedSightingService.getSightingsByOrganismId(organismId);
  return res.status(200).json(sightings);
}

async function getSightingsByUserId(req: Request, res: Response) {
  const { user_id: userId } = req.body;
  const sightings = await ConfirmedSightingService.getSightingsByUserId(userId);
  return res.status(200).json(sightings);
}

//CREATE function

async function createConfirmedSighting(req: Request, res: Response) {
  const confirmedSighting: ConfirmedSighting = req.body;

  await ConfirmedSightingService.createConfirmedSighting(confirmedSighting);

  return res.status(200).json("Successfully created");
}

//DELETE function

async function deleteSightingById(req: Request, res: Response)    {
  const { id: sightingId } = req.body;

  const sighting = await ConfirmedSightingService.deleteSightingById(sightingId);

  return res.status(200).json("Successfully deleted");
}

const ConfirmedSightingController = {
    getAllConfirmedSightings,
    getSightingsByOrganismId,
    getSightingsByUserId,
    createConfirmedSighting,
    deleteSightingById
  };
  
  export { ConfirmedSightingController };