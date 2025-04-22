const express = require("express");

const {
  handleGenerateCheckout,
  handleGetCheckoutLength,
  handleGetAllCheckouts,
  handleChangeStatus,
} = require("../controllers/checkout");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/allcheckouts", handleGetAllCheckouts);
router.post(
  "/uploadcheckout",
  restrictToLoggedinUserOnly,
  handleGenerateCheckout
);
router.get("/checkoutlength", handleGetCheckoutLength);
router.put("/changestatus/:checkout_id", handleChangeStatus);

module.exports = router;
