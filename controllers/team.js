const TEAM= require('../modules/team');

async function handleGenerateNewTeam(req, res) {
    const { name, profession, teamimage } = req.body;
    await TEAM.create({
        name,
        profession,
        teamimage,
    });
    return res.redirect('/');
}

module.exports = {handleGenerateNewTeam};