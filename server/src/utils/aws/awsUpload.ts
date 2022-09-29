import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import {S3Client} from "@aws-sdk/client-s3";

const S3_BUCKET = "cuilcaghspot";
const REGION = "eu-west-3";


const myBucket = new AWS.S3({
    params: { BUCKET: S3_BUCKET },
    region: REGION,
});

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
});

export async function uploadImage (file : File) {

    console.log(file);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const imageFileName = file.filename;

    console.log(imageFileName);
}

export function generatePreSignedPutUrl( fileName , fileType) {
        myBucket.getSignedUrl("putObject", {
            Key: fileName,
            ContentType: fileType,
    Expires: 600,
        }, (err, url) => {
            console.log(url);
            return url;
        });
}



