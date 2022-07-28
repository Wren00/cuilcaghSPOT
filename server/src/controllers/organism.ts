import express, { Request, Response } from 'express';
import { OrganismService } from "../services/organism";
import { CreateOrganism, Organism } from "../interfaces/organism";



async function getAllOrganisms(req: Request, res: Response) {
  try {
    const organisms = await OrganismService.getAllOrganisms();
    return res.status(200).json(organisms);
    }catch(error) {
      res.status(401).json("Cannot GET organisms.");
    }
  }

async function getOrganismByName(req: Request, res: Response) {
  try {
    const { taxonName : taxonName} = req.body;
    const organisms = await OrganismService.getOrganismByName(taxonName);
    return res.status(200).json(organisms);
    }catch(error) {
      res.status(401).json("Cannot find taxon name");
    }
  }

async function getOrganismById(req: Request, res: Response) {
  try {
  const { organismId: organismId } = req.body;
  const organism = await OrganismService.getOrganismById(organismId);
  return res.status(200).json(organism);
  }catch(error) {
    res.status(401).json("Cannot find id");
  }
}

async function getOrganismByTaxonGroupId(req: Request, res: Response) {
  try {
  const { taxonGroupId: taxonGroupId } = req.body;
  const organisms = await OrganismService.getOrganismById(taxonGroupId);
  return res.status(200).json(organisms);
  }catch(error) {
    res.status(401).json("Cannot find taxon group id");
  }
}

//UPDATE function

async function updateOrganism(req: Request, res: Response) {
  try{
    const updateDetails: Organism = req.body;
    const updatedOrganism = await OrganismService.updateOrganism(updateDetails);
    return res.status(200).json(updatedOrganism);
    }catch(error) {
      res.status(500).json("Could not update organism.");
    }
  }

//CREATE function

async function createOrganism(req: Request, res: Response) {
  try{
  const newOrganism: CreateOrganism = req.body;
  const createdOrganism = await OrganismService.createOrganism(newOrganism);
  return res.status(200).json(createdOrganism);
  }catch(error) {
    res.status(500).json("Could not create organism.");
  }
}

//DELETE function

async function deleteOrganismById(req: Request, res: Response)    {
  const { id: organismId } = req.body;

  const deletedOrganism = await OrganismService.deleteOrganismById(organismId);
  if(!deletedOrganism)  {
    return res.status(500).json("Cannot delete organism");
  }
  return res.status(200).json(deletedOrganism);
}

const OrganismController = {
  getAllOrganisms,
  getOrganismByName,
  getOrganismById, getOrganismByTaxonGroupId, updateOrganism, createOrganism, deleteOrganismById
};

export { OrganismController };