const Checkout = require("../modules/checkout");
const User = require("../modules/user");
async function handleTotalRevenue(req, res) {
  try {
    const checkout = await Checkout.find().populate("service_id");
    if (!checkout || checkout.length === 0) {
      return res.status(404).json({ error: "Cannot Find Checkout" });
    }

    let totalRevenue = 0;
    checkout.forEach((item) => {
      const amount = item?.service_id?.amount || 0;
      const quantity = item.quantity || 0;
      totalRevenue += amount * quantity;
    });

    return res.status(200).send({
      success: true,
      msg: "Get Success",
      data: totalRevenue,
    });
  } catch (error) {
    console.error("Revenue Error:", error);
    return res.status(500).json({ error: "Failed to Fetch Total Revenue" });
  }
}

async function handleAnnualOrderValue(req, res) {
  try {
    const checkout = await Checkout.find();
    if (!checkout || checkout.length === 0) {
      return res.status(404).json({ error: "Cannot Find Checkout" });
    }

    let AverageOrderValue = checkout.length * 100;

    return res.status(200).send({
      success: true,
      msg: "Get Success",
      data: AverageOrderValue,
    });
  } catch (error) {
    console.error("Revenue Error:", error);
    return res.status(500).json({ error: "Failed to Fetch Total Revenue" });
  }
}

async function handleConversionRate(req, res) {
  try {
    const checkouts = await Checkout.find();
    const user = await User.find();

    if (!checkouts || checkouts.length === 0) {
      return res.status(404).json({ error: "No checkouts found" });
    }

    if (!user) {
      return res.status(404).json({ error: "No Users found" });
    }

    const userIds = checkouts.map((item) => item.user_id.toString());

    const uniqueUsers = new Set(userIds);

    let conversionRate = (uniqueUsers.size / user.length) * 100;

    return res.status(200).json({
      success: true,
      msg: "Conversion count fetched successfully",
      data: conversionRate,
    });
  } catch (error) {
    console.error("Conversion rate error:", error);
    return res
      .status(500)
      .json({ error: "Failed to calculate conversion rate" });
  }
}

async function handleTotalUsers(req, res) {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).send({
      success: true,
      msg: "Get Success",
      data: user.length,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch lenght of User" });
  }
}

async function handleBestSellingRevenue(req, res) {
  try {
    const checkouts = await Checkout.find().populate("service_id");

    if (!checkouts || checkouts.length === 0) {
      return res.status(404).json({ error: "No checkouts found" });
    }

    const bestSellingCheckouts = checkouts.filter(
      (item) => item.service_id && item.service_id.best_selling === "true"
    );

    return res.status(200).json({
      success: true,
      msg: "Filtered best-selling checkouts",
      data: bestSellingCheckouts,
    });
  } catch (error) {
    console.error("Best Selling Revenue Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleTotalRevenue,
  handleAnnualOrderValue,
  handleConversionRate,
  handleTotalUsers,
  handleBestSellingRevenue,
};
