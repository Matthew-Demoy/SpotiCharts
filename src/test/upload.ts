import AWS from "aws-sdk";
import { uploadBase64Object } from "../core/aws/aws";
import { download } from "../core/file-system";


// https://geo-media.beatport.com/image_size/500x500/5f50a71b-00cc-4ee7-b150-56f3b89df011.jpg
export const testupload = async (url: string) => {
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  });

  var result = "";
  const options = {
    hostname: 'geo-media.beatport.com',
    port: 443,
    path: '/image_size/500x500/5f50a71b-00cc-4ee7-b150-56f3b89df011.jpg',
    method: 'GET'
  }

  await download(url, 'image.jpg')
  await uploadBase64Object('a-cover-test.jpg', './image.jpg')
  
  

};
