/** company-related functionaity */

const { Company } = require("../models/index");

/** companyList: list all companies */

module.exports.companyList = async function(req, res, next) {
  try {
    const companies = await Company.find({}, "name _id");
    res.json(companies);
  } catch (err) {
    console.error(err);
    next(new Error(`Can't list companes: ${err}`));
  }
};

/** companyInfo: return info on a company */

module.exports.companyInfo = async function(req, res, next) {
  try {
    const company = await Company.findById(req.params.company_id);
    res.json(company);
  } catch (err) {
    console.error(err);
    next(new Error(`Can't show company info: ${err}`));
  }
};

/** companyAdd: add a company */

module.exports.companyAdd = async function(req, res, next) {
  try {
    // console.debug("companyAdd =", req.body);
    const newCompany = await Company.create(req.body);
    res.json(newCompany);
  } catch (err) {
    console.error(err);
    next(new Error(`Can't add company: ${err}`));
  }
};

/** companyUpdate: update a company */

module.exports.companyUpdate = async function(req, res, next) {
  try {
    const company = await Company.findById(req.params.company_id);
    await company.set(req.body);
    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err);
    next(new Error(`Can't update company: ${err}`));
  }
};

/** companyDelete: delete company */

module.exports.companyDelete = async function(req, res, next) {
  try {
    const company = await Company.findByIdAndRemove(req.params.company_id);
    res.json({ message: "removed" });
  } catch (err) {
    console.log(err);
    next(new Error(`Can't delete company: ${err}`));
  }
};
