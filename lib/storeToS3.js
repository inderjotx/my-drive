import { PutObjectCommand, DeleteObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";


const client = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "week8-fake-drive"








export const getPresignedUrl = async (objectKey, operation, duration = 3600) => {


    const getUrl = (BUCKET_NAME, objectKey, duration) => {

        let command = ""
        if (operation == "put") {
            command = new PutObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey });
        }
        else {
            command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey });

        }
        return getSignedUrl(client, command, { expiresIn: duration });
    };

    const url = await getUrl(BUCKET_NAME, objectKey, duration)

    console.log("data from the pregined url ")
    console.log(url)

    return url
}





export async function deleteFromKey(key) {

    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
    });

    try {
        const response = await client.send(command);
        console.log(response)
        return true
    } catch (err) {
        console.log('[DELETE_OBJECT_ERROR]');
        return false
    }

}