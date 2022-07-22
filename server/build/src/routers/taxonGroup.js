"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxonGroupRouter = void 0;
var express_1 = __importDefault(require("express"));
var taxonGroup_1 = require("../controllers/taxonGroup");
var TaxonGroupRouter = express_1.default.Router();
exports.TaxonGroupRouter = TaxonGroupRouter;
TaxonGroupRouter.get("/getAllTaxonGroups", taxonGroup_1.TaxonGroupController.getAllTaxonGroups);
TaxonGroupRouter.get("/getTaxonGroupByName", taxonGroup_1.TaxonGroupController.getTaxonGroupByName);
TaxonGroupRouter.get("/getTaxonGroupById", taxonGroup_1.TaxonGroupController.getTaxonGroupById);
TaxonGroupRouter.post("/createTaxonGroup", taxonGroup_1.TaxonGroupController.createTaxonGroup);
TaxonGroupRouter.delete("/deleteTaxonGroupById", taxonGroup_1.TaxonGroupController.deleteTaxonGroupById);
