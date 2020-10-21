const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const morgan = require("morgan");

const logger = require("./util/logger");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const loggerStream = {
  write: (text) => {
    logger.info(text);
  },
};

app.use(morgan("combined", { stream: loggerStream }));

require("./routers")(app);

mode = process.env.NODE_ENV || "dev";

app.listen(config.get("port"), () => {
  logger.info("Started application");
});
