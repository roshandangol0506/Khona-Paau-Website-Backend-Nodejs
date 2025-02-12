const express = require("express");
const router= express.Router();
const { handleGenerateNewTeam } = require("../controllers/team");


router.post("/", handleGenerateNewTeam);

module.exports = router;