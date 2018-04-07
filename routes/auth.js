const express = require("express");
const handlers = require("../handlers/auth");

const router = express.Router();

router.post("/authenticate", handlers.authenticate);

module.exports = { authRoutes: router };
