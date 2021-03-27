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

    description: {
      type: String,
      nullable: false,
    },

    price: {
      type: "numeric",
      precision: 18,
      scale: 2,
      nullable: false,
      transformer: utils.db.transformers.bigNumber,
    },

    slug: {
      type: String,
      unique: true,
      nullable: false,
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

  checks: [],
});
