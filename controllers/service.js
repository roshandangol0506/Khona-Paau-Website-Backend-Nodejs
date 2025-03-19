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

async function handleBestSelling(req, res) {
  try {
    const service = await SERVICE.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (service.best_selling === "true") {
      service.best_selling = "false";
      await service.save();
    } else {
      service.best_selling = "true";
      await service.save();
    }

    return res.status(200).json({
      message: `Best Selling status updated to ${service.best_selling}`,
    });
  } catch (error) {
    console.error("Error toggling best selling:", error);
    return res.status(500).json({ error: "Failed to toggle best selling" });
  }
}

module.exports = {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
  handleBestSelling,
};
