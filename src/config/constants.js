const ENVIRONMENTS = {
    DEVELOPMENT: "DEVELOPMENT",
    STAGING: "STAGING",
    PRODUCTION: "PRODUCTION",
}

const DATABASE_CONNECTION = {
    NAME: 'mysql',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '3306',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DATABASE: process.env.DB_NAME || 'checkout_db',
}

const ENVIRONMENT = process.env.ENVIRONMENT ?? ENVIRONMENTS.DEVELOPMENT;

const constants = {
    ENVIRONMENTS: ENVIRONMENTS,
    ENVIRONMENT: ENVIRONMENT,
    PORT: process.env.PORT,
    DATABASE_CONNECTION: DATABASE_CONNECTION,
    IS_DEVELOPMENT_ENVIRONMENT: ENVIRONMENT === ENVIRONMENTS.DEVELOPMENT,
}

export default constants;