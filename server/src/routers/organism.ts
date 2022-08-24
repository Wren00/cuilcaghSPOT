import express from "express";
import { OrganismController } from "../controllers/organism";

const OrganismRouter = express.Router();

//PUBLIC endpoints

OrganismRouter.get("/getAllOrganisms", OrganismController.getAllOrganisms);
OrganismRouter.get("/getOrganismByName", OrganismController.getOrganismByName);
OrganismRouter.get("/getOrganismById/:id", OrganismController.getOrganismById);
OrganismRouter.get("/getOrganismByTaxonGroupId/:id", OrganismController.getOrganismByTaxonGroupId);

//PRIVATE endpoints

OrganismRouter.put("/updateOrganism", OrganismController.updateOrganism);
OrganismRouter.post("/createOrganism", OrganismController.createOrganism);
OrganismRouter.delete("/deleteOrganismById", OrganismController.deleteOrganismById);

export { OrganismRouter };
