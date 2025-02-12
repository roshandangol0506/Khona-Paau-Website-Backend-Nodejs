const express = require("express");

const {
  handleGenerateCheckout,
  handleCheckout,
} = require("../controllers/checkout");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/uploadcheckout", handleGenerateCheckout);

router.get("/checkout", restrictToLoggedinUserOnly, handleCheckout);

module.exports = router;
