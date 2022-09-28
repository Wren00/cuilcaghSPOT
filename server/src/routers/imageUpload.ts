import express from "express";
import {ImageController} from "../controllers/imageUpload";
import { upload} from "../utils/aws/awsUpload";


const ImageRouter = express.Router();

ImageRouter.post("/generatePreSignedUrl", ImageController.generatePreSignedUrl);
ImageRouter.post("/uploadImage", upload.single("file"), ImageController.uploadImageFile);


export {ImageRouter};
