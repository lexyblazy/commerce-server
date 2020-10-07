import * as kms from "../../kms";

export const encrypt = async (text: string): Promise<string> => {
  console.log(`encrypting for ${process.env.NODE_ENV}  environment`);

  return new Promise((resolve, reject) => {
    const kmsClient = kms.getClient();

    const keyId =
      process.env.NODE_ENV === "development"
        ? process.env.AWS_KMS_DEV_KEY_ARN
        : process.env.AWS_KMS_STAGING_KEY_ARN;

    kmsClient.encrypt(
      {
        KeyId: keyId!,
        Plaintext: Buffer.from(text),
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.CiphertextBlob?.toString("base64"));
        }
      }
    );
  });
};
