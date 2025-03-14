const { checkAuths } = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.get("/checkAuth", checkAuths);

module.exports = router;
