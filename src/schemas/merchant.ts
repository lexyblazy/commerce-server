import * as typeorm from "typeorm";

export const merchant = new typeorm.EntitySchema<MerchantEntity>({
  name: "merchants",

  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
      nullable: false,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },

    email: {
      type: String,
      nullable: false,
    },

    normalizedEmail: {
      type: String,
      nullable: false,
      unique: true,
    },

    password: {
      type: String,
      nullable: false,
    },

    firstName: {
      type: String,
      nullable: false,
    },

    lastName: {
      type: String,
      nullable: false,
    },

    emailVerified: {
      type: Boolean,
      nullable: false,
      default: false,
    },

    businessName: {
      type: String,
      nullable: true,
    },

    businessNameSlug: {
      type: String,
      unique: true,
      nullable: true,
    },
  },
});
