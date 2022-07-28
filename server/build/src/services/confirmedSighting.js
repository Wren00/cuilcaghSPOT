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
exports.ConfirmedSightingService = void 0;
var prisma_1 = require("../utils/prisma");
//GET functions
function getAllConfirmedSightings() {
    return __awaiter(this, void 0, void 0, function () {
        var confirmedSighting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    confirmedSighting = prisma_1.prisma.confirmed_sightings.findMany();
                    return [4 /*yield*/, confirmedSighting];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getSightingsByOrganismId(organismId) {
    return __awaiter(this, void 0, void 0, function () {
        var sighting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sighting = prisma_1.prisma.confirmed_sightings.findMany({
                        where: { organism_id: organismId },
                    });
                    return [4 /*yield*/, sighting];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getSightingsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sightings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sightings = prisma_1.prisma.confirmed_sightings.findMany({
                        where: { user_id: userId },
                    });
                    return [4 /*yield*/, sightings];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//CREATE functions
function createConfirmedSighting(sighting) {
    return __awaiter(this, void 0, void 0, function () {
        var confirmedSighting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.confirmed_sightings.create({
                        data: {
                            organism_id: sighting.organismId,
                            user_id: sighting.userId,
                            picture_url: sighting.pictureURL,
                            date: sighting.date,
                            lat: sighting.lat,
                            long: sighting.long
                        },
                    })];
                case 1:
                    confirmedSighting = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//DELETE function
function deleteSightingById(sightingId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedSighting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.confirmed_sightings.delete({
                        where: {
                            id: sightingId
                        },
                    })];
                case 1:
                    deletedSighting = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var ConfirmedSightingService = {
    getAllConfirmedSightings: getAllConfirmedSightings,
    getSightingsByOrganismId: getSightingsByOrganismId,
    getSightingsByUserId: getSightingsByUserId,
    createConfirmedSighting: createConfirmedSighting,
    deleteSightingById: deleteSightingById
};
exports.ConfirmedSightingService = ConfirmedSightingService;
