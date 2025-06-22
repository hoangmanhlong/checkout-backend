import { init, teardown } from "./mysql/index.js";

let app_database_init = null;
let app_database_close = null;

switch (process.env.DB_CONNECTION) {
    case "mysql":
        app_database_init = async () => init()
        app_database_close = async () => teardown()
        break;
    default:
        throw new Error('DB_CONNECTION is not set in environment variables')
}

export { app_database_init, app_database_close }