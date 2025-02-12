const MyCart = require("../modules/mycart");
const SERVICE = require("../modules/service");
const USER = require("../modules/user");

const path = require("path");
async function handleGenerateNewMyCart(req, res) {
  const { user, id: service_id } = req.body;

  try {
    const updatedCartItem = await MyCart.findOneAndUpdate(
      { user_id: user, service_id },
      { $set: { added_at: new Date() } },
      { upsert: true, new: true }
    );

    const referer = req.get("referer");
    res.redirect(referer || "/");
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

    // Find and delete the cart item
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
  let allservices = await SERVICE.find({});
  let alluser = await USER.findOne({ _id: req.user._id });
  let allmycart = await MyCart.find({ user_id: req.user._id }).populate({
    path: "service_id",
    match: { visible: "on" },
  });

  allmycart = allmycart.filter((cart) => cart.service_id);

  res.render("mycart", {
    user: req.user,
    path: path,
    mycart: allmycart,
    service: allservices,
    alluser: alluser,
  });
}

module.exports = { handleGenerateNewMyCart, handleMyCart, handleDeleteMyCart };
