const Category = require("../modules/category");

async function handleGetCategory(req, res) {
  try {
    const category = new Category.find();
    if (!category || category.length <= 0) {
      return res.status(404).json({ error: "Cannot find Category" });
    }
    res.status(200).send({ success: true, msg: "Get Success", data: category });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch team" });
  }
}
async function handleAddCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(404).json({ error: "Name not found" });
    }
    const existingCategory = await Category.find({ name });

    if (existingCategory) {
      return res.status(404).json({ error: "Name already Created" });
    }
    const newCategory = await Category.create({
      name,
    });

    res
      .status(200)
      .json({ message: "Team member added successfully", data: newCategory });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Create Category" });
  }
}
