var models = require("../models");
var express = require("express");
var router = express.Router();

//default route to get users
router.get("/", function(req, res) {
  console.log("Request: Get All Users!");
  models.users.findAll({ raw: true }).then(function(users) {
    res.render("users", { users: users });
  });
});

router.get("/create", function(req, res) {
  console.log("Request: Serve up the Create New User Page");
  res.send(
    "<html><body><p>This is where you'd create a new user</p></body></html>"
  );
});

//a post the insert a new user
router.post("/create", function(req, res) {
  console.log("Post: Create New User!");
  console.log("this is req.body", req.body);
  models.users
    .create(req.body, {
      //white list the fields that you want the user to be able to enter
      //(this prevents malicious users from entering data that shouldn't be modified)
      fields: ["firstName", "lastName", "email", "password"]
    })
    .then(function(insertedUser) {
      console.log("User Created!" + ": " + insertedUser);
      res.redirect("/api/v1/users");
    })
    .catch(function(error) {
      console.log(error);
    });
});
module.exports = router;
