import { constants } from "../config/index.js"


class AppUtils {
    isDevEnv() {
        return constants.ENVIRONMENT === constants.ENVIRONMENTS.DEVELOPMENT;
    }
}

const utils = new AppUtils();

export default utils;