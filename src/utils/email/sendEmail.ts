import sgMail from "@sendgrid/mail";

import * as kms from "../../kms";

import * as environment from "../environment";

export const sendEmail = async ({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}) => {
  environment.isStaging()
    ? sgMail.setApiKey(kms.SETTINGS.SENDGRID_API_KEY)
    : sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to,
    from,
    subject,
    html,
  };
  await sgMail.send(msg);
};
