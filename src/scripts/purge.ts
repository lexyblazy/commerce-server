// yarn build && node build/scripts/purge.js
import * as typeorm from "typeorm";

import * as schemas from "../schemas";
import * as utils from "../utils";
import { loadServices } from "../loadServices";

utils.logging.logFunctionException(async () => {
  await loadServices();
  const typeormConnection = typeorm.getConnection();
  const merchantsRepository = typeormConnection.getRepository(schemas.merchant);
  const sessionsRepository = typeormConnection.getRepository(schemas.session);
  const emailVerificationRequestsRepository = typeormConnection.getRepository(
    schemas.emailVerificationRequest
  );
  const passwordResetRequestRepository = typeormConnection.getRepository(
    schemas.passwordResetRequest
  );
  const productsRepository = typeormConnection.getRepository(schemas.product);

  const criteria = { id: typeorm.Not(typeorm.IsNull()) };
  await Promise.all([
    emailVerificationRequestsRepository.delete(criteria),
    sessionsRepository.delete(criteria),
    passwordResetRequestRepository.delete(criteria),
    productsRepository.delete(criteria),
  ]);

  await merchantsRepository.delete(criteria);
}, "PURGE DATABASE");
