const express = require("express");

const {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
  handleBestSelling,
} = require("../controllers/service");

const router = express.Router();

router.post("/uploadservi", handleGenerateNewService);
router.post("/disableitem", handleDisableItems);
router.post("/enableitem", handleEnableItems);
router.put("/bestselling/:id", handleBestSelling);

module.exports = router;
