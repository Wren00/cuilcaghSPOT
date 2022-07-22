"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnverifiedSightingRouter = void 0;
var express_1 = __importDefault(require("express"));
var unverifiedSighting_1 = require("../controllers/unverifiedSighting");
var UnverifiedSightingRouter = express_1.default.Router();
exports.UnverifiedSightingRouter = UnverifiedSightingRouter;
UnverifiedSightingRouter.get("/getAllUnverifiedSightings", unverifiedSighting_1.UnverifiedSightingController.getAllUnverifiedSightings);
UnverifiedSightingRouter.get("/getSightingsByOrganismId", unverifiedSighting_1.UnverifiedSightingController.getSightingsByOrganismId);
UnverifiedSightingRouter.get("/getSightingsByUserId", unverifiedSighting_1.UnverifiedSightingController.getSightingsByUserId);
UnverifiedSightingRouter.post("/createUnverifiedSighting", unverifiedSighting_1.UnverifiedSightingController.createUnverifiedSighting);
UnverifiedSightingRouter.delete("/deleteSightingById", unverifiedSighting_1.UnverifiedSightingController.deleteSightingById);
