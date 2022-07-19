import express from "express";
import {
    OrganismController
} from "../controllers/organism";

const OrganismRouter = express.Router();

//PUBLIC endpoints

OrganismRouter.get("/getAllOrganisms", OrganismController.getAllOrganisms);
OrganismRouter.get("/getOrganismByName", OrganismController.getOrganismByName);

//PRIVATE endpoints

OrganismRouter.get("/getOrganismById", OrganismController.getOrganismById);
OrganismRouter.get("/getOrganismByTaxonGroupId", OrganismController.getOrganismByTaxonGroupId);
OrganismRouter.put("/updateOrganism", OrganismController.updateOrganism);
OrganismRouter.post("/createOrganism", OrganismController.createOrganism);
OrganismRouter.delete("/deleteOrganismById", OrganismController.deleteOrganismById);


export { OrganismRouter };

