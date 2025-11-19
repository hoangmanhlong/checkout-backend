import winston from "winston";
import constants from "./constants.js";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Best practice timestamp format
const timestampFormat = winston.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss",
});

const logger = winston.createLogger({
  level: constants.IS_DEVELOPMENT_ENVIRONMENT ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    timestampFormat,
    constants.IS_DEVELOPMENT_ENVIRONMENT
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} | ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
