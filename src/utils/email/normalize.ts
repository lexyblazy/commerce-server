import normalizeEmail from "normalize-email";

export const normalize = (email: string) => {
  return normalizeEmail(email);
};
