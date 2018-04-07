/** LinkedList server */

const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Config

const PORT = 3000;
const app = express();
app.use(morgan("dev"));

// Parse body as JSON, regardless of the MIME type
app.use(bodyParser.json({ type: "*/*" }));

// Load SECRET_KEY from .env file
dotEnv.load();
// console.log("app SECRET_KEY", process.env.SECRET_KEY);

// Database settings

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/linkedlist");

// Routes

const { companyRoutes, userRoutes, authRoutes } = require("./routes/index");

app.use("/company", companyRoutes);
app.use("/user", userRoutes);
app.use("/", authRoutes);

// Error handler to catch errors in routes

app.use(function(err, req, res, next) {
  res.status(500).json({ message: err.message });
});

// Start server

app.listen(PORT, function(err) {
  if (err) throw new Error("app.listen error", err);
  console.log("listening on", PORT);
});
