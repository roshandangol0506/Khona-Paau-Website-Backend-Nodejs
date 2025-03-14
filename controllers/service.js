const SERVICE = require("../modules/service");

async function handleGenerateNewService(req, res) {
  try {
    const { name, subtitle, amount, description, photo } = req.body;
    if (!name || !subtitle || !amount || !description || !photo) {
      return res.status(500).json({ error: "All Fields must be required" });
    }
    const newService = await SERVICE.create({
      name,
      subtitle,
      amount,
      description,
      photo,
      visible: "on",
    });
    return res.status(201).json({
      message: "Products added successfully",
      service: newService,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add Products" });
  }
}

async function handleDisableItems(req, res) {
  try {
    await SERVICE.findByIdAndUpdate(req.body.id, { visible: "off" });
    return res.status(201).json({
      message: "Successfully Disabled",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to disable visible" });
  }
}

async function handleEnableItems(req, res) {
  try {
    await SERVICE.findByIdAndUpdate(req.body.id, { visible: "on" });
    return res.status(201).json({
      message: "Successfully Enabled",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to enable visible" });
  }
}

module.exports = {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
};
