const config = require("config");
const { createLogger, format, transports } = require("winston");
const { combine, splat, timestamp, printf } = format;

const logConfig = config.get("logger");

const date = new Date();

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = createLogger({
  transports: [
    new transports.File({
      level: logConfig.level,
      filename: `./logs/${
        logConfig.outputFilePrefix
      }-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      format: combine(splat(), timestamp(), myFormat),
    }),
    new transports.Console({
      level: logConfig.level,
      handleExceptions: true,
      json: true,
      format: combine(format.colorize(), splat(), timestamp(), myFormat),
    }),
  ],
});
module.exports = logger;
