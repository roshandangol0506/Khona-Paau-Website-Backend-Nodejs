const express = require("express");
const { handleUpdateGeneralSetting } = require("../controllers/generalsetting");

const router = express.Router();

router.post("/generalsetting", handleUpdateGeneralSetting);

module.exports = router;
