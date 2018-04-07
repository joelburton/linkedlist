const express = require("express");
const handlers = require("../handlers/user.js");
const { check } = require("../handlers/auth");

const router = express.Router();

router
  .route("/")
  .get(check, handlers.listUsers)
  .post(handlers.addUser);

router
  .route("/:user_id")
  .get(handlers.showUser)
  .patch(handlers.updateUser);

module.exports = { userRoutes: router };
