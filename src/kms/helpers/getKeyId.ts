export const getKeyId = () => {
  const environment = process.env.environment as Environment;

  let keyId: string | null;

  switch (environment) {
    case "development":
      keyId = process.env.AWS_KMS_DEV_KEY_ARN!;
      break;

    case "staging":
      keyId = process.env.AWS_KMS_STAGING_KEY_ARN!;
      break;
    default:
      keyId = null;
  }

  return keyId;
};
