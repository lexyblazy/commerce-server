interface MerchantEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  normalizedEmail: string;
  password: string;

  firstName: string;
  lastName: string;
}

interface SessionEntity {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  token: string;

  mfaVerified: boolean;

  user: MerchantEntity;
}
