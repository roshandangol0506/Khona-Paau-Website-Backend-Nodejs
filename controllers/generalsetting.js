const General_Setting = require("../modules/generalsetting");

async function handleUpdateGeneralSetting(req, res) {
  try {
    const { name, subtitle, description, logo, currency, timezone } = req.body;

    const newGeneralSetting = await General_Setting.create({
      name,
      subtitle,
      description,
      logo,
      currency,
      timezone,
    });

    return res.status(201).json({
      message: "General Settings added successfully",
      team: newGeneralSetting,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add General Settings" });
  }
}

module.exports = { handleUpdateGeneralSetting };
