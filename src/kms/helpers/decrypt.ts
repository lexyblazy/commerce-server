import * as kms from "../../kms";

export const decrypt = async (text: string): Promise<string> => {
  console.log(`decrypting for ${process.env.NODE_ENV}  environment`);

  return new Promise((resolve, reject) => {
    const kmsClient = kms.getClient();
    const keyId =
      process.env.NODE_ENV === "development"
        ? process.env.AWS_KMS_DEV_KEY_ARN
        : process.env.AWS_KMS_STAGING_KEY_ARN;

    const buffer = Buffer.from(text, "base64");

    kmsClient.decrypt(
      { KeyId: keyId!, CiphertextBlob: buffer },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Plaintext?.toString());
        }
      }
    );
  });
};
