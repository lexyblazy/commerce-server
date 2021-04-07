import { EntitySchema } from "typeorm";

import * as utils from "../utils";

export const product = new EntitySchema<ProductEntity>({
  name: "products",

  columns: {
    id: {
      type: "uuid",
      generated: "uuid",
      primary: true,
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

    name: {
      type: String,
      nullable: false,
    },

    description: {
      type: String,
      nullable: false,
    },

    slug: {
      type: String,
      unique: true,
      nullable: false,
    },

    price: {
      type: "numeric",
      precision: 18,
      scale: 2,
      nullable: false,
      transformer: utils.db.transformers.bigNumber,
    },

    comparePrice: {
      type: "numeric",
      precision: 18,
      scale: 2,
      transformer: utils.db.transformers.bigNumber,
      nullable: true,
      default: null,
    },

    costPerItem: {
      type: "numeric",
      precision: 18,
      scale: 2,
      nullable: false,
      transformer: utils.db.transformers.bigNumber,
    },

    quantity: {
      type: "integer",
      nullable: true,
      default: null,
      transformer: utils.db.transformers.bigNumber,
    },

    barcode: {
      type: String,
      nullable: false,
    },

    sku: {
      type: String,
      nullable: false,
    },

    isPhysicalProduct: {
      type: Boolean,
      nullable: false,
      default: false,
    },

    allowOutOfStockPurchase: {
      type: Boolean,
      nullable: false,
      default: false,
    },
  },

  relations: {
    merchant: {
      type: "many-to-one",
      target: "merchants",
      joinColumn: true,

      nullable: false,
    },
  },

  checks: [
    {
      name: "checkPhysicalProductMustHaveAtLeastOneUnit",
      expression: `("isPhysicalProduct" IS FALSE) OR ("isPhysicalProduct" IS TRUE AND quantity IS NOT NULL AND quantity > 0)`,
    },
  ],
});
