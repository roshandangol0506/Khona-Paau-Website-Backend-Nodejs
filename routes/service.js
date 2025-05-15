const express = require("express");

const {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
  handleBestSelling,
  handleDeleteItems,
  handleGetSpecificItems,
  handleEditItems,
  handleGetServiceLength,
} = require("../controllers/service");

const router = express.Router();

router.get("/product/:product_id", handleGetSpecificItems);
router.post("/uploadservi", handleGenerateNewService);
router.post("/disableitem", handleDisableItems);
router.put("/enableitem/:id", handleEnableItems);
router.put("/bestselling/:id", handleBestSelling);
router.delete("/deleteitem/:product_id", handleDeleteItems);
router.get("/servicelength", handleGetServiceLength);

module.exports = router;
