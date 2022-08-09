import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { OrganismRouter } from './src/routers/organism';
import { UserRouter } from './src/routers/user';
import { UserGroupRouter } from './src/routers/userGroup';
import{ UnverifiedSightingRouter } from './src/routers/unverifiedSighting';
import { ConfirmedSightingRouter } from './src/routers/confirmedSighting';
import { TaxonGroupRouter } from './src/routers/taxonGroup';
import { AuthenticationRouter } from './src/routers/authentication';
import { Authenticate } from "./src/middlewares/authentication";

/* initialise Express app */
const app = express();

/* setup middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/*', Authenticate);

/* setup Express Routers */

app.use('/api/organisms', OrganismRouter);
app.use('/api/users/', UserRouter);
app.use('/api/interestgroups/', UserGroupRouter);
app.use('/api/unverifiedsightings/', UnverifiedSightingRouter);
app.use('/api/confirmedsightings/', ConfirmedSightingRouter);
app.use('/api/taxongroups/', TaxonGroupRouter);
app.use('/api/auth/', AuthenticationRouter);


export { app };