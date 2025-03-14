const MyCart = require("../modules/mycart");
const SERVICE = require("../modules/service");
const USER = require("../modules/user");

const path = require("path");
async function handleGenerateNewMyCart(req, res) {
  const { user_id, service_id } = req.body;

  try {
    const updatedCartItem = await MyCart.findOneAndUpdate(
      { user_id, service_id },
      { $set: { added_at: new Date() } },
      { upsert: true, new: true }
    );

    const referer = req.get("referer");
    return res.status(201).json({
      message: "My Cart added successfully",
      mycart: updatedCartItem,
      referer: referer,
    });
  } catch (error) {
    res.status(500).send("An error occurred while updating the cart.");
  }
}

async function handleDeleteMyCart(req, res) {
  try {
    const { serviceId, userId } = req.body;

    if (!serviceId || !userId) {
      return res.status(400).send("Missing required fields.");
    }

    await MyCart.findOneAndDelete({ service_id: serviceId, user_id: userId });

    res.status(200).json({ message: "Item removed from cart successfully." });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ message: "An error occurred while removing the item." });
  }
}

async function handleMyCart(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    let allservices = await SERVICE.find({});
    let alluser = await USER.findOne({ _id: req.user._id });
    let allmycart = await MyCart.find({ user_id: req.user._id }).populate({
      path: "service_id",
      match: { visible: "on" },
    });

    allmycart = allmycart.filter((cart) => cart.service_id);

    res.json({ mycart: allmycart, user: alluser, services: allservices });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

module.exports = { handleGenerateNewMyCart, handleMyCart, handleDeleteMyCart };
