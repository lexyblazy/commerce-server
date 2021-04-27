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
  storeName: string;
  storeNameSlug: string;
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
  comparePrice: import("bignumber.js").BigNumber | null;
  costPerItem: import("bignumber.js").BigNumber;

  isPhysicalProduct: boolean;
  quantity: import("bignumber.js").BigNumber | null;
  allowOutOfStockPurchase: boolean;

  sku: string;
  barcode: string;

  merchant: MerchantEntity;
}

interface ProductHistory {
  event: "PRICE_CHANGED" | "NAME_CHANGED" | "DESCRIPTION_CHANGED";
}
