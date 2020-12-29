import * as kms from "../../kms";

export const encrypt = async (text: string): Promise<string> => {
  console.log(`encrypting for ${process.env.environment}  environment`);

  return new Promise((resolve, reject) => {
    const kmsClient = kms.getClient();

    const keyId = kms.helpers.getKeyId();

    if (!keyId) {
      throw Error(`Cannot get keyId`);
    }

    kmsClient.encrypt(
      {
        KeyId: keyId,
        Plaintext: Buffer.from(text),
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (data.CiphertextBlob) {
            resolve(data.CiphertextBlob.toString("base64"));
          } else {
            throw new Error("Failed to encrypt [text]");
          }
        }
      }
    );
  });
};
