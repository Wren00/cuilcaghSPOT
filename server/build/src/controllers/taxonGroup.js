"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxonGroupController = void 0;
var taxonGroup_1 = require("../services/taxonGroup");
function getAllTaxonGroups(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var taxonGroups;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, taxonGroup_1.TaxonGroupService.getAllTaxonGroups()];
                case 1:
                    taxonGroups = _a.sent();
                    return [2 /*return*/, res.status(200).json(taxonGroups)];
            }
        });
    });
}
function getTaxonGroupByName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var taxonGroupName, taxonGroup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taxonGroupName = req.body.taxonGroupName;
                    return [4 /*yield*/, taxonGroup_1.TaxonGroupService.getTaxonGroupByName(taxonGroupName)];
                case 1:
                    taxonGroup = _a.sent();
                    return [2 /*return*/, res.status(200).json(taxonGroup)];
            }
        });
    });
}
function getTaxonGroupById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var taxonGroupId, taxonGroup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taxonGroupId = req.body.taxonId;
                    return [4 /*yield*/, taxonGroup_1.TaxonGroupService.getTaxonGroupById(taxonGroupId)];
                case 1:
                    taxonGroup = _a.sent();
                    return [2 /*return*/, res.status(200).json(taxonGroup)];
            }
        });
    });
}
//CREATE function
function createTaxonGroup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newTaxonGroup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTaxonGroup = req.body;
                    return [4 /*yield*/, taxonGroup_1.TaxonGroupService.createTaxonGroup(newTaxonGroup)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json("Successfully created")];
            }
        });
    });
}
//DELETE function
function deleteTaxonGroupById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var TaxonGroupId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TaxonGroupId = req.body.taxonId;
                    return [4 /*yield*/, taxonGroup_1.TaxonGroupService.deleteTaxonGroupById(TaxonGroupId)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, res.status(200).json("Successfully deleted")];
            }
        });
    });
}
var TaxonGroupController = {
    getAllTaxonGroups: getAllTaxonGroups,
    getTaxonGroupByName: getTaxonGroupByName,
    getTaxonGroupById: getTaxonGroupById,
    createTaxonGroup: createTaxonGroup,
    deleteTaxonGroupById: deleteTaxonGroupById
};
exports.TaxonGroupController = TaxonGroupController;
