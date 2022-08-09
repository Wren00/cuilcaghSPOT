import express, { Request, Response } from 'express';
import { ConfirmedSightingService } from "../services/confirmedSighting";
import { ConfirmedSighting } from "../interfaces/confirmedSighting";



async function getAllConfirmedSightings(req: Request, res: Response) {
  try {
    const sightings = await ConfirmedSightingService.getAllConfirmedSightings();
    return res.status(200).json(sightings);
    }catch(error) {
      res.status(401).json("Cannot GET sightings");
    }
  }

async function getSightingsByOrganismId(req: Request, res: Response) {
  try {
    const organismId = parseInt(req.params["id"]);
    const sightings = await ConfirmedSightingService.getSightingsByOrganismId(organismId);
    return res.status(200).json(sightings);
    } catch(error)  {
      res.status(401).json("Cannot find organism Id");
    }
  }

async function getSightingsByUserId(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params["id"]);
    const sightings = await ConfirmedSightingService.getSightingsByUserId(userId);
    return res.status(200).json(sightings);
    } catch(error)  {
      res.status(401).json("Cannot find user Id");
    }
  }

//CREATE function

async function createConfirmedSighting(req: Request, res: Response) {
  try{
    const newSighting: ConfirmedSighting = req.body;
    const createdSighting = await ConfirmedSightingService.createConfirmedSighting(newSighting);
    return res.status(200).json(createdSighting);
    }catch(error) {
      res.status(500).json("Could not create sighting.");
    }
  }

//DELETE function

async function deleteSightingById(req: Request, res: Response)    {
  const { sightingId: sightingId } = req.body;

  const deletedSighting = await ConfirmedSightingService.deleteConfirmedSightingById(sightingId);
  if(!deletedSighting)  {
    return res.status(500).json("Cannot delete sighting");
  }
  return res.status(200).json(deletedSighting);
}

const ConfirmedSightingController = {
    getAllConfirmedSightings,
    getSightingsByOrganismId,
    getSightingsByUserId,
    createConfirmedSighting,
    deleteSightingById
  };
  
  export { ConfirmedSightingController };