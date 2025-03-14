const TEAM = require("../modules/team");

// async function handleGenerateNewTeam(req, res) {
//     const { name, profession, teamimage } = req.body;
//     await TEAM.create({
//         name,
//         profession,
//         teamimage,
//     });
//     return res.redirect('/');
// }

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

module.exports = { handleGenerateNewTeam };
