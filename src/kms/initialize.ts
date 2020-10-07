import AWS from "aws-sdk";

let kmsClient: AWS.KMS;

export const initialize = () => {
  const { AWS_KMS_ACCESS_KEY, AWS_KMS_SECRET_KEY, AWS_REGION } = process.env;

  if (!AWS_KMS_ACCESS_KEY || !AWS_KMS_SECRET_KEY) {
    throw new Error("AWS_KMS_ACCESS_KEY OR AWS_KMS_SECRET_KEY is undefined");
  }

  kmsClient = new AWS.KMS({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_KMS_ACCESS_KEY,
      secretAccessKey: AWS_KMS_SECRET_KEY,
    },
  });
};

export const getClient = () => {
  if (!kmsClient) {
    throw new Error("KMS Client is not intialized");
  }

  return kmsClient;
};
