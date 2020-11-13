import { EntitySchema } from "typeorm";

export const passwordResetRequest = new EntitySchema<PasswordResetRequest>({
  name: "passwordResetRequests",
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

    expiresAt: {
      type: "timestamp",
      nullable: false,
    },

    token: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "merchants",
      nullable: false,
    },
  },
});
