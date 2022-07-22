"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var organism_1 = require("./src/routers/organism");
var user_1 = require("./src/routers/user");
var userGroup_1 = require("./src/routers/userGroup");
var unverifiedSighting_1 = require("./src/routers/unverifiedSighting");
var confirmedSighting_1 = require("./src/routers/confirmedSighting");
var taxonGroup_1 = require("./src/routers/taxonGroup");
var authentication_1 = require("./src/routers/authentication");
var authentication_2 = require("./src/middlewares/authentication");
/* initialise Express app */
var app = (0, express_1.default)();
exports.app = app;
/* setup middleware */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/*', authentication_2.Authenticate);
/* setup Express Routers */
app.use('/api/organisms/', organism_1.OrganismRouter);
app.use('/api/users/', user_1.UserRouter);
app.use('/api/interestgroups/', userGroup_1.UserGroupRouter);
app.use('/api/unverifiedsightings/', unverifiedSighting_1.UnverifiedSightingRouter);
app.use('/api/confirmedsightings/', confirmedSighting_1.ConfirmedSightingRouter);
app.use('/api/taxongroups/', taxonGroup_1.TaxonGroupRouter);
app.use('/api/auth/', authentication_1.AuthenticationRouter);
