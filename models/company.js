/** companies schemas */

const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = { Company };
