import express, { Request, Response } from 'express';
import { OrganismService } from "../services/organism";
import { Organism } from "../interfaces/organism";



async function getAllOrganisms(req: Request, res: Response) {
  const organisms = await OrganismService.getAllOrganisms();
  return res.status(200).json(organisms);
}

async function getOrganismByName(req: Request, res: Response) {
  const { organismName: organismName } = req.body;
  const organism = await OrganismService.getOrganismByName(organismName);
  return res.status(200).json(organism);
}

async function getOrganismById(req: Request, res: Response) {
  const { organismId: organismId } = req.body;
  const organism = await OrganismService.getOrganismById(organismId);
  return res.status(200).json(organism);
}

async function getOrganismByTaxonGroupId(req: Request, res: Response) {
  const { taxonGroupId: organismId } = req.body;
  const organism = await OrganismService.getOrganismByTaxonGroupId(organismId);
  return res.status(200).json(organism);
}

//UPDATE function

async function updateOrganism(req: Request, res: Response) {
  const newOrganism: Organism = req.body;
  
  const updatedOrganism = await OrganismService.updateOrganism(newOrganism);
  return res.status(200).json(updatedOrganism);
}

//CREATE function

async function createOrganism(req: Request, res: Response) {
  const newOrganism: Organism = req.body;

  await OrganismService.createOrganism(newOrganism);

  return res.status(200).json("Successfully created");
}

//DELETE function

async function deleteOrganismById(req: Request, res: Response)    {
  const { id: organismId } = req.body;

  const user = await OrganismService.deleteOrganismById(organismId);

  return res.status(200).json("Successfully deleted");
}

const OrganismController = {
  getAllOrganisms,
  getOrganismByName,
  getOrganismById, getOrganismByTaxonGroupId, updateOrganism, createOrganism, deleteOrganismById
};

export { OrganismController };