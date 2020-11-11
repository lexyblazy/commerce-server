import * as kms from "../../kms";

export const decrypt = async (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const kmsClient = kms.getClient();

    const keyId = kms.helpers.getKeyId();

    if (!keyId) {
      throw Error(`Cannot get keyId`);
    }

    const buffer = Buffer.from(text, "base64");

    kmsClient.decrypt({ KeyId: keyId, CiphertextBlob: buffer }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Plaintext?.toString());
      }
    });
  });
};
