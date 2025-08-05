import constants from "./constants.js";
import logger from "./logging.js";


logger.info(`${constants.ENVIRONMENT} environment`);

export { constants, logger }