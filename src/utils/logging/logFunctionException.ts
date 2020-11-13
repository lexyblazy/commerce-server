import fs from "fs";

import * as kms from "../../kms";

import * as email from "../email";
import * as environment from "../environment";

const fileName = `${Date.now()}-error.txt`;

export const logFunctionException = async <T>(fn: () => T, logName: string) => {
  try {
    console.log(`${logName} STARTING`);

    const result = await fn();

    console.log(`${logName} DONE`);

    return result;
  } catch (error) {
    console.log(logName, error);

    const readableError = JSON.stringify(error, undefined, 3);

    // use logFiles for development errors, use email/sentry for staging errors
    if (environment.isDevelopment()) {
      fs.appendFileSync(fileName, readableError, "utf8");
    } else {
      const subject = `${process.env.environment} - ${logName}`;

      await email.sendEmail({
        from: kms.SETTINGS.INTERNAL_LOGS_EMAIL,
        to: kms.SETTINGS.ADMIN_EMAIL,
        subject,
        html: readableError,
      });
    }

    return null;
  }
};
