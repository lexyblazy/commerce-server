import sgMail from "@sendgrid/mail";
import * as kms from "../../kms";

export const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  sgMail.setApiKey(kms.SETTINGS.SENDGRID_API_KEY);

  const emailSubject = `${process.env.environment} - ${subject}`;

  const msg = {
    to,
    from,
    subject: emailSubject,
    text,
    html,
  };
  // ES6
  await sgMail.send(msg);
};
