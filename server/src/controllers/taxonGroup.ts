import express, { Request, Response } from 'express';
import { TaxonGroupService } from "../services/taxonGroup";
import { TaxonGroup } from "../interfaces/taxonGroup";



async function getAllTaxonGroups(req: Request, res: Response) {
  try {
    const taxonGroups = await TaxonGroupService.getAllTaxonGroups();
    return res.status(200).json(taxonGroups);
    }catch(error) {
      res.status(401).json("Cannot access database");
    }
  }

async function getTaxonGroupByName(req: Request, res: Response) {
  try {
    const { taxonGroupName : taxonGroupName } = req.body;
    const groups = await TaxonGroupService.getTaxonGroupByName(taxonGroupName);
    return res.status(200).json(groups);
    }catch(error) {
      res.status(401).json("Cannot find taxon group name");
    }
  }

async function getTaxonGroupById(req: Request, res: Response) {
  try {
    const { taxonGroupId: taxonGroupId} = req.body;
    const taxonGroup = await TaxonGroupService.getTaxonGroupById(taxonGroupId);
    return res.status(200).json(taxonGroup);
    }catch(error) {
      res.status(401).json("Cannot find id");
    }
  }

//CREATE function

async function createTaxonGroup(req: Request, res: Response) {
  try{
    const newTaxonGroup: TaxonGroup = req.body;
    const createdTaxonGroup = await TaxonGroupService.createTaxonGroup(newTaxonGroup);
    return res.status(200).json(createdTaxonGroup);
    }catch(error) {
      res.status(500).json("Could not create taxon group.");
    }
  }

//DELETE function

async function deleteTaxonGroupById(req: Request, res: Response)    {
  const { taxonGroupId: taxonGroupId } = req.body;

  const deletedTaxonGroup= await TaxonGroupService.deleteTaxonGroupById(taxonGroupId);
  if(!deletedTaxonGroup)  {
    return res.status(500).json("Cannot delete taxon group");
  }
  return res.status(200).json(deletedTaxonGroup);
}

const TaxonGroupController = {
  getAllTaxonGroups,
  getTaxonGroupByName,
  getTaxonGroupById, createTaxonGroup, deleteTaxonGroupById
};

export { TaxonGroupController };