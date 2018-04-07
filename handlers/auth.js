/** functionality for authentication & authorization.  */

const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
console.log("auth SECRET_KEY", SECRET_KEY);

/** authenticate: get username, password from req, verify
 *   against database, and, if valid, return JWT.
 * */

module.exports.authenticate = async function(req, res, next) {
  try {
    const { username, password } = req.body;
    console.log("authenticate", username, password);
    const user = await User.findOne({ username });

    if (await bcrypt.compare(password, user.password)) {
      console.log("password valid");
      const token = await jwt.sign({ username: username }, SECRET_KEY);
      res.json({ token });
    }
  } catch (err) {
    console.log(err);
    next(new Error(err.message));
  }
};

/** check: middleware to verify JWT  */

module.exports.check = async function(req, res, next) {
  console.log("check headers", req.headers);
  const token = req.headers.authorization.split(" ")[1];
  console.log("check", token);

  try {
    const payload = await jwt.verify(token, SECRET_KEY);
    console.log("check payload=", payload);
    req.username = payload.username;
    next();
  } catch (err) {
    next(new Error(`invalid token: ${err}`));
  }
};
