import * as typeorm from "typeorm";
import * as uuid from "uuid";

import * as schemas from "../../schemas";
import * as utils from "../../utils";

export const create = async (merchant: MerchantEntity) => {
  const LOG_NAME = "sessions.helpers.create => ";

  return utils.logging.logFunctionException(async () => {
    const typeormConnection = typeorm.getConnection();
    const sessionsRepository = typeormConnection.getRepository(schemas.session);

    const newSession: Partial<SessionEntity> = {
      token: uuid.v4(),
      user: merchant,
    };
    const session = await sessionsRepository.save(newSession);

    return session;
  }, LOG_NAME);
};
