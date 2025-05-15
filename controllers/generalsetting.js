const General_Setting = require("../modules/generalsetting");

async function handleUpdateGeneralSetting(req, res) {
  try {
    const existing = await General_Setting.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ error: "Only one general setting is allowed." });
    }

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

async function handleGetGeneralSetting(req, res) {
  try {
    const general_setting = await General_Setting.findById(
      "680731dc89bdf730b095ecfd"
    );
    if (!general_setting) {
      return res.status(404).json({ error: "Cannot Find General Setting" });
    }
    res
      .status(200)
      .send({ success: true, msg: "Get Success", data: general_setting });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Product" });
  }
}

async function handleEditGeneralSetting(req, res) {
  try {
    const {
      name,
      subtitle,
      description,
      currency,
      timezone,
      maintenance_mode,
      logo,
    } = req.body;

    const generalSetting = await General_Setting.findOne();
    if (!generalSetting) {
      return res.status(404).json({ error: "General Setting not found" });
    }

    if (name) generalSetting.name = name;
    if (subtitle) generalSetting.subtitle = subtitle;
    if (description) generalSetting.description = description;
    if (currency) generalSetting.currency = currency;
    if (timezone) generalSetting.timezone = timezone;
    if (maintenance_mode) generalSetting.maintenance_mode = maintenance_mode;
    if (logo) generalSetting.logo = logo;

    await generalSetting.save();

    return res
      .status(200)
      .json({ message: "General Setting updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update General Setting" });
  }
}

module.exports = {
  handleUpdateGeneralSetting,
  handleGetGeneralSetting,
  handleEditGeneralSetting,
};
