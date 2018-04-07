const express = require("express");
const handlers = require("../handlers/company");

const router = express.Router();

router.get("/", handlers.companyList);
router.post("/", handlers.companyAdd);

router
  .route("/:company_id")
  .get(handlers.companyInfo)
  .patch(handlers.companyUpdate)
  .delete(handlers.companyDelete);

module.exports = { companyRoutes: router };
