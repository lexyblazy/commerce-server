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
  businessName: string;
  businessNameSlug: string;
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

interface PasswordResetRequestEntity {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  token: string;

  user: MerchantEntity;

  expiresAt: Date;
}

interface ProductImage {
  url: string;
  position: number;
  deleted: boolean;
}

interface ProductEntity {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  name: string;
  description: string;
  slug: string;
  // images: ProductImage[];

  price: import("bignumber.js").BigNumber;

  merchant: MerchantEntity;
}
