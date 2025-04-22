const express = require("express");
const router = express.Router();

const {
  handleGenerateNewTeam,
  handleDeleteTeams,
  handleEditTeams,
  handleGetSpecificTeam,
  handleGetTeamLength,
} = require("../controllers/team");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/team/:team_id", handleGetSpecificTeam);
router.post("/", handleGenerateNewTeam);
router.delete("/deleteteams/:team_id", handleDeleteTeams);
router.put("/editteam/:team_id", upload.single("photo"), handleEditTeams);
router.get("/teamlength", handleGetTeamLength);

module.exports = router;
