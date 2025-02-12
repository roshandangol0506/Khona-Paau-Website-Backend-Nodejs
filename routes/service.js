const express = require("express");

const {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
} = require("../controllers/service");

const router = express.Router();

router.post("/uploadservi", handleGenerateNewService);
router.post("/disableitem", handleDisableItems);
router.post("/enableitem", handleEnableItems);

module.exports = router;
