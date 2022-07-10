import express, { Request, Response } from 'express';
import { TaxonGroupService } from "../services/taxonGroup";
import { TaxonGroup } from "../interfaces/taxonGroup";



async function getAllTaxonGroups(req: Request, res: Response) {
  const taxonGroups = await TaxonGroupService.getAllTaxonGroups();
  return res.status(200).json(taxonGroups);
}

async function getTaxonGroupByName(req: Request, res: Response) {
  const { taxon_group_name: taxonGroupName } = req.body;
  const taxonGroup = await TaxonGroupService.getTaxonGroupByName(taxonGroupName);
  return res.status(200).json(taxonGroup);
}

async function getTaxonGroupById(req: Request, res: Response) {
  const { id: taxonGroupId } = req.body;
  const taxonGroup = await TaxonGroupService.getTaxonGroupById(taxonGroupId);
  return res.status(200).json(taxonGroup);
}

//CREATE function

async function createTaxonGroup(req: Request, res: Response) {
  const newTaxonGroup: TaxonGroup = req.body;

  await TaxonGroupService.createTaxonGroup(newTaxonGroup);

  return res.status(200).json("Successfully created");
}

//DELETE function

async function deleteTaxonGroupById(req: Request, res: Response)    {
  const { id: TaxonGroupId } = req.body;

  const user = await TaxonGroupService.deleteTaxonGroupById(TaxonGroupId);

  return res.status(200).json("Successfully deleted");
}

const TaxonGroupController = {
  getAllTaxonGroups,
  getTaxonGroupByName,
  getTaxonGroupById, createTaxonGroup, deleteTaxonGroupById
};

export { TaxonGroupController };