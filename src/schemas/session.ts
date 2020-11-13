import * as typeorm from "typeorm";

export const session = new typeorm.EntitySchema<SessionEntity>({
  name: "sessions",

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

    token: {
      type: String,
      nullable: false,
    },

    mfaVerified: {
      type: Boolean,
      nullable: false,
      default: false,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      nullable: false,
      target: "merchants",
    },
  },
});
