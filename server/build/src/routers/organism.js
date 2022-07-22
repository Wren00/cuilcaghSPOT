"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganismRouter = void 0;
var express_1 = __importDefault(require("express"));
var organism_1 = require("../controllers/organism");
var OrganismRouter = express_1.default.Router();
exports.OrganismRouter = OrganismRouter;
//PUBLIC endpoints
OrganismRouter.get("/getAllOrganisms", organism_1.OrganismController.getAllOrganisms);
OrganismRouter.get("/getOrganismByName", organism_1.OrganismController.getOrganismByName);
//PRIVATE endpoints
OrganismRouter.get("/getOrganismById", organism_1.OrganismController.getOrganismById);
OrganismRouter.get("/getOrganismByTaxonGroupId", organism_1.OrganismController.getOrganismByTaxonGroupId);
OrganismRouter.put("/updateOrganism", organism_1.OrganismController.updateOrganism);
OrganismRouter.post("/createOrganism", organism_1.OrganismController.createOrganism);
OrganismRouter.delete("/deleteOrganismById", organism_1.OrganismController.deleteOrganismById);
