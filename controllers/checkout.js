const MyCart = require("../modules/mycart"); // Adjust the path to your MyCart model
const Checkout = require("../modules/checkout"); // Adjust the path to your Checkout model
const SERVICE = require("../modules/service");
const USER = require("../modules/user");
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "roshan2121004@iimscollege.edu.np", // Replace with your email
    pass: "Dontbreathe1", // Replace with your app password
  },
});

async function handleGenerateCheckout(req, res) {
  let allcheckout = await Checkout.find({ user_id: req.user.id }).populate(
    "service_id"
  );
  const { selectedItems, location, phoneno } = req.body;

  if (!selectedItems || selectedItems.length === 0) {
    return res.render("mycart", {
      error: "No items selected.",
    });
  }

  if (!location || !phoneno) {
    return res.render("mycart", {
      error: "Location and phone number are required.",
    });
  }

  try {
    const selectedCartItems = await MyCart.find({
      _id: { $in: selectedItems },
    }).populate("service_id");

    // Create an array of Checkout items
    const checkoutItems = selectedCartItems.map((cartItem) => ({
      user_id: cartItem.user_id,
      service_id: cartItem.service_id._id,
      quantity: req.body[`quantity-${cartItem._id}`] || 1, // Retrieve the quantity from the form
    }));

    // Update the user with location and phone number
    const userId = selectedCartItems[0]?.user_id; // Assuming all selected items belong to the same user
    if (userId) {
      await USER.findByIdAndUpdate(
        userId,
        { location, phoneno }, // Update location and phone number
        { new: true } // Return the updated document
      );
    } else {
      return res.render("mycart", {
        error: "Failed to update user details.",
      });
    }

    // Insert items into the Checkout collection
    await Checkout.insertMany(checkoutItems);

    // Remove the selected items from MyCart
    await MyCart.deleteMany({ _id: { $in: selectedItems } });

    let serviceDetails = "";

    selectedCartItems.forEach((cartItem) => {
      serviceDetails += `
        <p>
          <strong>Service:</strong> ${cartItem.service_id.name}<br>
          <strong>Quantity:</strong> ${
            req.body[`quantity-${cartItem._id}`] || 1
          }
        </p>
      `;
    });

    const emailBody = `
      <h3>Checkout Details</h3>
      <p><strong>Name:</strong> ${req.user.name}</p>
      <p><strong>Email:</strong> ${req.user.email}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Phone No:</strong> ${phoneno}</p>
      <h4>Selected Services:</h4>
      ${serviceDetails}
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: '"Roshan Dangol" <roshan2121004@iimscollege.edu.np>', // Sender address
      to: "roshan.dangol00@gmail.com", // Recipient email
      subject: "Checkout Submission", // Email subject
      html: emailBody, // Email body
    });

    res.redirect("/mycart"); // Redirect to the MyCart page or another page
  } catch (error) {
    return res.render("mycart", {
      error: "An error occurred during checkout.",
    });
  }
}

async function handleCheckout(req, res) {
  let allservices = await SERVICE.find({});
  let allcheckout = await Checkout.find({ user_id: req.user._id }).populate(
    "service_id"
  );

  res.render("checkout", {
    user: req.user,
    path: path,
    checkout: allcheckout,
    service: allservices,
  });
}

module.exports = { handleGenerateCheckout, handleCheckout };
