import express from "express";
import {
    UnverifiedSightingController
} from "../controllers/unverifiedSighting";

const UnverifiedSightingRouter = express.Router();

//PUBLIC endpoints

UnverifiedSightingRouter.get("/getAllUnverifiedSightings", UnverifiedSightingController.getAllUnverifiedSightings);
UnverifiedSightingRouter.get("/getSightingsById/:id", UnverifiedSightingController.getSightingsById);
UnverifiedSightingRouter.get("/getSightingsByOrganismId/:id", UnverifiedSightingController.getSightingsByOrganismId);
UnverifiedSightingRouter.get("/getSightingsByUserId/:id", UnverifiedSightingController.getSightingsByUserId);

//PRIVATE endpoints

UnverifiedSightingRouter.post("/createUnverifiedSighting", UnverifiedSightingController.createUnverifiedSighting);
UnverifiedSightingRouter.put("/updateSighting", UnverifiedSightingController.updateSighting);
UnverifiedSightingRouter.put("/incrementUserVote/:id", UnverifiedSightingController.incrementUserVote);
UnverifiedSightingRouter.put("/decrementUserVote/:id", UnverifiedSightingController.decrementUserVote);
UnverifiedSightingRouter.delete("/deleteUnverifiedSightingById", UnverifiedSightingController.deleteUnverifiedSightingById);

export { UnverifiedSightingRouter };