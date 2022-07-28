"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmedSightingRouter = void 0;
var express_1 = __importDefault(require("express"));
var confirmedSighting_1 = require("../controllers/confirmedSighting");
var ConfirmedSightingRouter = express_1.default.Router();
exports.ConfirmedSightingRouter = ConfirmedSightingRouter;
ConfirmedSightingRouter.get("/getAllConfirmedSightings", confirmedSighting_1.ConfirmedSightingController.getAllConfirmedSightings);
ConfirmedSightingRouter.get("/getSightingsByOrganismId", confirmedSighting_1.ConfirmedSightingController.getSightingsByOrganismId);
ConfirmedSightingRouter.get("/getSightingsByUserId", confirmedSighting_1.ConfirmedSightingController.getSightingsByUserId);
ConfirmedSightingRouter.post("/createConfirmedSighting", confirmedSighting_1.ConfirmedSightingController.createConfirmedSighting);
ConfirmedSightingRouter.delete("/deleteSightingById", confirmedSighting_1.ConfirmedSightingController.deleteSightingById);
