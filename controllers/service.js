const SERVICE = require("../modules/service");

async function handleGenerateNewService(req, res) {
  try {
    const { name, subtitle, amount, description, photo } = req.body;
    if (!name || !subtitle || !amount || !description || !photo) {
      return res.render("uploadservice", {
        error: "All Fields are required",
      });
    }
    await SERVICE.create({
      name,
      subtitle,
      amount,
      description,
      photo,
      visible: "on",
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("uploadservice", {
      error: "An error occurred during uploading Items.",
    });
  }
}

async function handleDisableItems(req, res) {
  try {
    await SERVICE.findByIdAndUpdate(req.body.id, { visible: "off" });
    return res.redirect("/uploadservice");
  } catch (error) {
    return res.render("uploadservice", {
      error: "An error occurred during disabling Items.",
    });
  }
}

async function handleEnableItems(req, res) {
  try {
    await SERVICE.findByIdAndUpdate(req.body.id, { visible: "on" });
    return res.redirect("/uploadservice");
  } catch (error) {
    return res.render("uploadservice", {
      error: "An error occurred during enabling Items.",
    });
  }
}

module.exports = {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
};
