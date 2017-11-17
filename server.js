const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const ejs = require("ejs");
const http = require("http");
const { loadFile } = require("sequelize-fixtures");

const { normalizePort, onError, onListening } = require("./utils");
const models = require("./models");
// routes
const routes = require("./routes/index");
const users = require("./routes/users");

const app = express();
// view engine setup
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//Specify which routes to use
app.use("/", routes);
app.use("/api/v1/users", users);

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "4000");
// var port = normalizePort("5009");
app.set("port", port);
console.log("Process.Env PORT:", process.env.PORT);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
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
    console.log("load files");
    loadFile("./seed/industry.json", models);
    loadFile("./seed/userPrefs.json", models);
    loadFile("./seed/user.json", models);
    // .then(() => console.log(`SUCCESS: files loaded.
    //                         listening on port: ${PORT}`))
    // .catch(err) => console.log(`loading ${err}`));
    // console.log("file load complete");
    // console.log(`listening on port: ${PORT}`);
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
