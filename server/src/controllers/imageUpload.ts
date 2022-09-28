import {Request, Response} from "express";
import {generatePreSignedPutUrl, uploadImage} from "../utils/aws/awsUpload";


async function generatePreSignedUrl(req: Request, res: Response) {

    try {
        const fileName = req.body.fileName;
        const fileType = req.body.fileType;
        const url = generatePreSignedPutUrl(fileName, fileType);
        return res.status(200).json(url);
    } catch (error) {
        res.status(401).json("Cannot generate presigned url");
    }
}

async function uploadImageFile(req: Request, res: Response) {
    try {
        console.log(req);
        console.log("trying");

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fileToUpload : any = req.file;
console.log(fileToUpload);
        const file = await uploadImage(fileToUpload);
        console.log(file);
        res.status(200).json(fileToUpload.location);
    } catch (error) {
        throw new Error;
    }
}

const ImageController = {
    generatePreSignedUrl,
    uploadImageFile
};

export {ImageController};
