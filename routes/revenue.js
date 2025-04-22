const express = require("express");
const {
  handleTotalRevenue,
  handleAnnualOrderValue,
  handleConversionRate,
  handleTotalUsers,
  handleBestSellingRevenue,
} = require("../controllers/revenue");

const router = express.Router();

router.get("/totalrevenue", handleTotalRevenue);
router.get("/averageordervalue", handleAnnualOrderValue);
router.get("/conversionrate", handleConversionRate);
router.get("/totalusers", handleTotalUsers);
router.get("/bestsellingrevenue", handleBestSellingRevenue);

module.exports = router;
