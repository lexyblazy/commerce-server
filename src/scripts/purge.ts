// yarn build && node build/scripts/purge.js
import { loadServices } from "../loadServices";
import * as typeorm from "typeorm";

import * as utils from "../utils";
import * as schemas from "../schemas";

utils.logging.logFunctionException(async () => {
  await loadServices();
  const typeormConnection = typeorm.getConnection();
  const merchantsRepository = typeormConnection.getRepository(schemas.merchant);
  const sessionsRepository = typeormConnection.getRepository(schemas.session);
  const emailVerificationRequestsRepository = typeormConnection.getRepository(
    schemas.emailVerificationRequest
  );

  const criteria = { id: typeorm.Not(typeorm.IsNull()) };
  await Promise.all([
    emailVerificationRequestsRepository.delete(criteria),
    sessionsRepository.delete(criteria),
  ]);

  await merchantsRepository.delete(criteria);
}, "PURGE DATABASE");
