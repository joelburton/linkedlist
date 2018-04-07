/** User functionality. */

const { User } = require("../models/index");

/** listUsers: List all users. */

module.exports.listUsers = async function(req, res, next) {
  try {
    const users = await User.find({}, "_id username email");
    res.json(users);
  } catch (err) {
    console.error(err);
    next(`Can't list users: ${err}`);
  }
};

/** addUser: add a user */

module.exports.addUser = async function(req, res, next) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    next(`Can't add user: ${err}`);
  }
};

/** updateUser: update a user. */

module.exports.updateUser = async function(req, res, next) {
  try {
    const user = await User.findById(req.params.user_id);
    await user.set(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    next(`Can't update user: ${err}`);
  }
};

/** showUse: show info on a user. */

module.exports.showUser = async function(req, res, next) {
  try {
    const user = await User.findById(req.params.user_id);
    res.json(user);
  } catch (err) {
    console.error(err);
    next(`Can't show user: ${err}`);
  }
};
