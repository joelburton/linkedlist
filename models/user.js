/** user model */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// number of bcrypt encryption rounds to perform
const ROUNDS = 10;

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    hobbies: { type: Array },
  },
  { timestamps: true }
);

/** pre-save hook to hash pashword */

userSchema.pre("save", async function hashPassword(next) {
  console.log("User.pre save");

  // if they haven't changed the password, it will still be hashed;
  // bail out, since we don't want to re-hash it
  if (!this.isModified("password")) return next();

  // change password to hashed version
  const hashed = await bcrypt.hash(this.password, ROUNDS);
  this.password = hashed;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
