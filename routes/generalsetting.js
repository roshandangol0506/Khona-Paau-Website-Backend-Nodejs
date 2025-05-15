const express = require("express");
const {
  handleGetGeneralSetting,
  handleEditGeneralSetting,
} = require("../controllers/generalsetting");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/generalsetting", handleGetGeneralSetting);

module.exports = router;
