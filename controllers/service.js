const SERVICE = require("../modules/service");

async function handleGetSpecificItems(req, res) {
  try {
    const { product_id } = req.params;
    const product = await SERVICE.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Cannot Find Product" });
    }
    res.status(200).send({ success: true, msg: "Get Success", data: product });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Product" });
  }
}

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
    const service = await SERVICE.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (service.visible === "on") {
      service.visible = "off";
      await service.save();
    } else {
      service.visible = "on";
      await service.save();
    }

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

async function handleDeleteItems(req, res) {
  try {
    const { product_id } = req.params;
    const product = await SERVICE.findByIdAndDelete(product_id);
    if (!product) {
      return res.status(404).json({ error: "Cannot Find Products" });
    }
    return res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Delete Product" });
  }
}

async function handleEditItems(req, res) {
  try {
    const { product_id } = req.params;
    const { name, subtitle, description, amount, visible, best_selling } =
      req.body;

    console.log("photo file:", req.file); // if any

    const product = await SERVICE.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    if (name) product.name = name;
    if (subtitle) product.subtitle = subtitle;
    if (description) product.description = description;
    if (amount) product.amount = amount;
    if (visible) product.visible = visible;
    if (best_selling) product.best_selling = best_selling;

    await product.save();

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update Product" });
  }
}

module.exports = {
  handleGetSpecificItems,
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
  handleBestSelling,
  handleDeleteItems,
  handleEditItems,
};
