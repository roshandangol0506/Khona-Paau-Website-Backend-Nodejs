const express = require("express");

const { handleGenerateCheckout } = require("../controllers/checkout");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/uploadcheckout",
  restrictToLoggedinUserOnly,
  handleGenerateCheckout
);

module.exports = router;
