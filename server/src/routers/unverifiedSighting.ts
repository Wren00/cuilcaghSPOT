import express from "express";
import {
    UnverifiedSightingController
} from "../controllers/unverifiedSighting";

const UnverifiedSightingRouter = express.Router();

UnverifiedSightingRouter.get("/getAllUnverifiedSightings", UnverifiedSightingController.getAllUnverifiedSightings);
UnverifiedSightingRouter.get("/getSightingsByOrganismId", UnverifiedSightingController.getSightingsByOrganismId);
UnverifiedSightingRouter.get("/getSightingsByUserId", UnverifiedSightingController.getSightingsByUserId);
UnverifiedSightingRouter.post("/createUnverifiedSighting", UnverifiedSightingController.createUnverifiedSighting);
UnverifiedSightingRouter.delete("/deleteSightingById", UnverifiedSightingController.deleteSightingById);

export { UnverifiedSightingRouter };