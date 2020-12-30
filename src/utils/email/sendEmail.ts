import sgMail from "@sendgrid/mail";

import * as kms from "../../kms";

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
  sgMail.setApiKey(kms.SETTINGS.SENDGRID_API_KEY);

  const msg = {
    to,
    from,
    subject,
    html,
  };
  await sgMail.send(msg);
};
