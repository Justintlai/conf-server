const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const cors = require("cors");
const { loadFile } = require("sequelize-fixtures");

const { normalizePort, onError, onListening } = require("./utils");
const models = require("./models");

const app = express();
// view engine setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "5001");
app.set("port", port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
models.sequelize
  .sync({
    force: true //only use in dev - remove in production as all data will be erased
  })
  .then(function() {
    console.log("db connected");
    server.listen(port);
    server.on("error", err => onError(err, port));
    server.on("listening", () => onListening(server));
  })
  .then(() => {
    loadFile("./industry.json", models);
    loadFile("./userPrefs.json", models);
    loadFile("./users.json", models);
    // .then(() => console.log("success"))
    // .catch(err) => console.log(`loading ${err}`));
  });

//catch 404 and forward error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler
// no stacktraces leadked to user unless in dev env
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {}
  });
});
