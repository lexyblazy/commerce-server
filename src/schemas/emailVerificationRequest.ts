import * as typeorm from "typeorm";

export const emailVerificationRequest = new typeorm.EntitySchema<
  EmailVerificationRequestEntity
>({
  name: "emailVerificationRequests",
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
    token: {
      type: String,
      nullable: false,
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
