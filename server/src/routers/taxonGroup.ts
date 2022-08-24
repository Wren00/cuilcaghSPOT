import express from "express";
import { TaxonGroupController } from "../controllers/taxonGroup";

const TaxonGroupRouter = express.Router();

//PUBLIC endpoints

TaxonGroupRouter.get("/getAllTaxonGroups", TaxonGroupController.getAllTaxonGroups);
TaxonGroupRouter.get("/getTaxonGroupByName", TaxonGroupController.getTaxonGroupByName);
TaxonGroupRouter.get("/getTaxonGroupById/:id", TaxonGroupController.getTaxonGroupById);

//PRIVATE endpoints

TaxonGroupRouter.post("/createTaxonGroup", TaxonGroupController.createTaxonGroup);
TaxonGroupRouter.delete("/deleteTaxonGroupById", TaxonGroupController.deleteTaxonGroupById);

export { TaxonGroupRouter };
