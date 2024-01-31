import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";


const client = new S3Client({});
const BUCKET_NAME = "week8-fake-drive"








export const getPresignedUrl = async (objectKey, operation) => {

    // try {

    const getUrl = (BUCKET_NAME, objectKey) => {

        let command = ""
        if (operation == "put") {
            command = new PutObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey });
        }
        else {
            command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey });

        }
        return getSignedUrl(client, command, { expiresIn: 3600 });
    };

    const url = await getUrl(BUCKET_NAME, objectKey)

    console.log("data from the pregined url ")
    console.log(url)

    return url
    // }


    // catch (error) {
    //     console.log(error)
    //     return error
    // }
}