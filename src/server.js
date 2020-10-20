const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mode = process.env.NODE_ENV || "dev";

app.use("/check", (req, res) => {
  res.send("Up and Running");
});

app.listen(config.get("port"), () => {});
