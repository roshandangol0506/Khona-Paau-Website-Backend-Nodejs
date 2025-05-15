const MyCart = require("../modules/mycart");
const Checkout = require("../modules/checkout");
const SERVICE = require("../modules/service");
const USER = require("../modules/user");
const path = require("path");
const nodemailer = require("nodemailer");
const { request } = require("http");
const { setUser } = require("../service/auth");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "roshan2121004@iimscollege.edu.np",
    pass: "Dontbreathe1",
  },
});

async function handleGetCheckoutLength(req, res) {
  try {
    const checkout = await Checkout.find();

    if (!checkout) {
      return res.status(404).json({ error: "Cannot Find Checkout" });
    }

    const checkoutlength = checkout.length;

    return res
      .status(200)
      .send({ success: true, msg: "Get Success", data: checkoutlength });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Checkout" });
  }
}

async function handleGetAllCheckouts(req, res) {
  try {
    const checkout = await Checkout.find()
      .populate("service_id")
      .populate("user_id");
    if (!checkout) {
      return res.status(404).json({ error: "Cannot Find Checkout" });
    }
    return res
      .status(200)
      .send({ success: true, msg: "Get Success", data: checkout });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Checkout" });
  }
}

async function handleGenerateCheckout(req, res) {
  let allcheckout = await Checkout.find({ user_id: req.user.id }).populate(
    "service_id"
  );
  const { selectedItems, location, phoneno } = req.body;

  if (!selectedItems || selectedItems.length === 0) {
    return res.status(400).send("No items Selected.");
  }

  if (!location || !phoneno) {
    return res.status(400).send("Location and phone number are required.");
  }

  try {
    const cartIds = selectedItems.map((item) => item.cart_id);

    const selectedCartItems = await MyCart.find({
      _id: { $in: cartIds },
    }).populate("service_id");

    const checkoutItems = selectedCartItems.map((cartItem) => ({
      user_id: cartItem.user_id,
      service_id: cartItem.service_id._id,
      quantity:
        selectedItems.find((item) => item.cart_id === cartItem._id.toString())
          ?.quantity || 1,
      location: location,
      phoneno: phoneno,
    }));

    await Checkout.insertMany(checkoutItems);

    await MyCart.deleteMany({ _id: { $in: cartIds } });

    const user = await USER.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("location", location);
    console.log("phoneo", phoneno);
    if (location) user.location = location;
    if (phoneno) user.phoneno = phoneno;

    await user.save();

    const userUid = req.cookies?.uid;
    if (userUid) {
      setUser(userUid, user);
    }

    // const userUid = req.cookies?.uid;
    // console.log("userUid from handlecheckout", userUid);
    // if (userUid) {
    //   setUser(userUid, user);
    // }

    res.status(200).json({
      message: "Item are Successfully Checkout",
      location: location,
      phoneNumber: phoneno,
      selectedItems: selectedItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate checkout.");
  }

  // try {
  //   const selectedCartItems = await MyCart.find({
  //     _id: { $in: selectedItems },
  //   }).populate("service_id");

  //   const checkoutItems = selectedCartItems.map((cartItem) => ({
  //     user_id: cartItem.user_id,
  //     service_id: cartItem.service_id._id,
  //     quantity: req.body[`quantity-${cartItem._id}`] || 1,
  //   }));

  //   const userId = selectedCartItems[0]?.user_id;
  //   if (userId) {
  //     await USER.findByIdAndUpdate(
  //       userId,
  //       { location, phoneno },
  //       { new: true }
  //     );
  //   } else {
  //     return res.status(400).send("Failed to update user details.");
  //   }

  //   await Checkout.insertMany(checkoutItems);

  //   await MyCart.deleteMany({ _id: { $in: selectedItems } });

  //   let serviceDetails = "";

  //   selectedCartItems.forEach((cartItem) => {
  //     serviceDetails += `
  //       <p>
  //         <strong>Service:</strong> ${cartItem.service_id.name}<br>
  //         <strong>Quantity:</strong> ${
  //           req.body[`quantity-${cartItem._id}`] || 1
  //         }
  //       </p>
  //     `;
  //   });

  //   const emailBody = `
  //     <h3>Checkout Details</h3>
  //     <p><strong>Name:</strong> ${req.user.name}</p>
  //     <p><strong>Email:</strong> ${req.user.email}</p>
  //     <p><strong>Location:</strong> ${location}</p>
  //     <p><strong>Phone No:</strong> ${phoneno}</p>
  //     <h4>Selected Services:</h4>
  //     ${serviceDetails}
  //   `;

  //   const info = await transporter.sendMail({
  //     from: '"Roshan Dangol" <roshan2121004@iimscollege.edu.np>',
  //     to: "roshan.dangol00@gmail.com",
  //     subject: "Checkout Submission",
  //     html: emailBody,
  //   });

  //   res.status(200).json({ message: "Item are Successfully Checkout" });
  // } catch (error) {
  //   return res.status(400).send("An error occured while checkout");
  // }
}

async function handleChangeStatus(req, res) {
  try {
    const checkout = await Checkout.findById(req.params.checkout_id);
    const { status } = req.body;

    if (!checkout) {
      return res.status(404).json({ error: "checkout not found" });
    }

    if (status) checkout.status = status;

    await checkout.save();

    return res.status(200).json({
      message: `Status updated to ${checkout.status}`,
    });
  } catch (error) {
    console.error("Error toggling Status:", error);
    return res.status(500).json({ error: "Failed to toggle Status" });
  }
}

module.exports = {
  handleGenerateCheckout,
  handleGetCheckoutLength,
  handleGetAllCheckouts,
  handleChangeStatus,
};
