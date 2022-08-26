import express from "express";
import { ConfirmedSightingController } from "../controllers/confirmedSighting";

const ConfirmedSightingRouter = express.Router();

//PUBLIC endpoints

ConfirmedSightingRouter.get("/getAllConfirmedSightings", ConfirmedSightingController.getAllConfirmedSightings);
ConfirmedSightingRouter.get("/getConfirmedSightingById/:id", ConfirmedSightingController.getConfirmedSightingById);
ConfirmedSightingRouter.get("/getSightingsByOrganismId/:id", ConfirmedSightingController.getSightingsByOrganismId);
ConfirmedSightingRouter.get("/getSightingsByUserId/:id", ConfirmedSightingController.getSightingsByUserId);

//PRIVATE endpoints

ConfirmedSightingRouter.post("/createConfirmedSighting", ConfirmedSightingController.createConfirmedSighting);
ConfirmedSightingRouter.delete("/deleteSightingById", ConfirmedSightingController.deleteSightingById);

export { ConfirmedSightingRouter };
