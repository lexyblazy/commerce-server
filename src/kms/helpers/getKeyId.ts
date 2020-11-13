export const getKeyId = () => {
  const environment = process.env.environment as Environment;

  return environment === "staging"
    ? process.env.AWS_KMS_STAGING_KEY_ARN
    : process.env.AWS_KMS_DEV_KEY_ARN;
};
