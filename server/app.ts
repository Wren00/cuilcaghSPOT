import express from "express";
import cors from "cors";
import { OrganismRouter } from "./src/routers/organism";
import { UserRouter } from "./src/routers/user";
import { UserGroupRouter } from "./src/routers/userGroup";
import { UnverifiedSightingRouter } from "./src/routers/unverifiedSighting";
import { ConfirmedSightingRouter } from "./src/routers/confirmedSighting";
import { TaxonGroupRouter } from "./src/routers/taxonGroup";
import { AuthenticationRouter } from "./src/routers/authentication";
import { UserReactionRouter} from "./src/routers/userReactions";
import { UserPostRouter } from "./src/routers/userPosts";
import {ImageRouter} from "./src/routers/imageUpload";

/* initialise Express app */
const app = express();

/* setup middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/*', Authenticate);

/* setup Express Routers */

app.use("/api/organisms", OrganismRouter);
app.use("/api/users/", UserRouter);
app.use("/api/posts/", UserPostRouter);
app.use("/api/interestgroups/", UserGroupRouter);
app.use("/api/unverifiedsightings/", UnverifiedSightingRouter);
app.use("/api/confirmedsightings/", ConfirmedSightingRouter);
app.use("/api/taxongroups/", TaxonGroupRouter);
app.use("/api/reactions/", UserReactionRouter);
app.use("/api/auth/", AuthenticationRouter);
app.use("/api/images/", ImageRouter);



export { app };
