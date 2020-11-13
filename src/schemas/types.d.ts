interface MerchantEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  normalizedEmail: string;
  password: string;

  firstName: string;
  lastName: string;

  emailVerified: boolean;
}

interface SessionEntity {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  token: string;

  mfaVerified: boolean;

  user: MerchantEntity;
}

interface EmailVerificationRequestEntity {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  token: string;

  user: MerchantEntity;
}

interface PasswordResetRequest {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  token: string;

  user: MerchantEntity;

  expiresAt: Date;
}
