import AWS from "aws-sdk";
import fs from 'fs'
AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.APP_AWS_REGION,
});

const signedUrlExpireSeconds = 6000 * 1;

export const getSignedURLForObject = (key: string) => {
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  });

  const url = s3.getSignedUrl("getObject", {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
};

export const uploadBase64Object = async (key: string, path: string) => {
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  });

  const contents = fs.readFileSync(path);
  const params = {
    Bucket: process.env.S3_BUCKET || "",
    Key: key,
    Body: contents
  };
  
  
  const res = await s3.upload(params).promise();
  return res
};
