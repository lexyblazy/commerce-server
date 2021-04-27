import * as express from "express";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

import * as kms from "../../kms";
import * as utils from "../../utils";

export const getSignedUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const LOG_NAME = "uploads.handlers.getSignedUrl => ";
  return utils.logging.logHandlerException(
    async () => {
      const s3 = new AWS.S3({});

      const files: Array<{ name: string; type: string }> = req.body.files;

      const promises = files.map((file) => {
        const splitName = file.name.split(".");
        const extension = splitName[splitName.length - 1]?.toLocaleLowerCase();
        const fileName = splitName.slice(0, splitName.length - 1).join("");

        console.log(fileName);

        const key = `uploads/products/${fileName}-${nanoid()}.${extension}`;
        const s3Params = {
          Bucket: kms.SETTINGS.AWS_S3_COMMERCIFY_IMAGE_BUCKET,
          Key: key,
          ContentType: file.type,
          ACL: "public-read",
        };

        return s3.getSignedUrlPromise("putObject", s3Params);
      });

      const result = await Promise.all(promises);

      console.log(result);

      res.send(result);
    },
    LOG_NAME,
    res
  );
};
