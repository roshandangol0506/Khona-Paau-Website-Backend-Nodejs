const TEAM = require("../modules/team");

async function handleGetTeamLength(req, res) {
  try {
    const team = await TEAM.find();
    if (!team) {
      return res.status(404).json({ error: "Cannot Find team" });
    }
    const teamlength = team.length;
    res
      .status(200)
      .send({ success: true, msg: "Get Success", data: teamlength });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch team" });
  }
}

async function handleGetSpecificTeam(req, res) {
  try {
    const { team_id } = req.params;
    const team = await TEAM.findById(team_id);
    if (!team) {
      return res.status(404).json({ error: "Cannot Find team" });
    }
    res.status(200).send({ success: true, msg: "Get Success", data: team });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch team" });
  }
}

async function handleGenerateNewTeam(req, res) {
  try {
    const { name, profession, teamimage } = req.body;

    const newTeam = await TEAM.create({
      name,
      profession,
      teamimage,
    });

    return res.status(201).json({
      message: "Team member added successfully",
      team: newTeam,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add team member" });
  }
}

async function handleDeleteTeams(req, res) {
  try {
    const { team_id } = req.params;
    const team = await TEAM.findByIdAndDelete(team_id);
    if (!team) {
      return res.status(404).json({ error: "Cannot Find Team" });
    }
    return res.status(200).json({ message: "Team Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Delete Team" });
  }
}

async function handleEditTeams(req, res) {
  try {
    const { team_id } = req.params;
    const { name, profession } = req.body;

    console.log("photo file:", req.file); // if any

    const team = await TEAM.findById(team_id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (name) team.name = name;
    if (profession) team.profession = profession;

    await team.save();

    return res.status(200).json({ message: "Team updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Team to update Product" });
  }
}

module.exports = {
  handleGenerateNewTeam,
  handleDeleteTeams,
  handleEditTeams,
  handleGetSpecificTeam,
  handleGetTeamLength,
};
