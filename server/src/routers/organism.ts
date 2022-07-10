import express from "express";
import {
    OrganismController
} from "../controllers/organism";

const OrganismRouter = express.Router();

OrganismRouter.get("/getAllOrganisms", OrganismController.getAllOrganisms);
OrganismRouter.get("/getOrganismByName", OrganismController.getOrganismByName);
OrganismRouter.get("/getOrganismById", OrganismController.getOrganismById);
OrganismRouter.get("/getOrganismByTaxonGroupId", OrganismController.getOrganismByTaxonGroupId);
OrganismRouter.put("/updateOrganism", OrganismController.updateOrganism);
OrganismRouter.post("/createOrganism", OrganismController.createOrganism);
OrganismRouter.delete("/deleteOrganismById", OrganismController.deleteOrganismById);


export { OrganismRouter };

