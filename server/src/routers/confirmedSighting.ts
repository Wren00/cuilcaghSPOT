import express from "express";
import {
    ConfirmedSightingController
} from "../controllers/confirmedSighting";

const ConfirmedSightingRouter = express.Router();

//PUBLIC endpoints

ConfirmedSightingRouter.get("/getAllConfirmedSightings", ConfirmedSightingController.getAllConfirmedSightings);

//PRIVATE endpoints

ConfirmedSightingRouter.get("/getSightingsByOrganismId", ConfirmedSightingController.getSightingsByOrganismId);
ConfirmedSightingRouter.get("/getSightingsByUserId", ConfirmedSightingController.getSightingsByUserId);
ConfirmedSightingRouter.post("/createConfirmedSighting", ConfirmedSightingController.createConfirmedSighting);
ConfirmedSightingRouter.delete("/deleteSightingById", ConfirmedSightingController.deleteSightingById);



export { ConfirmedSightingRouter };