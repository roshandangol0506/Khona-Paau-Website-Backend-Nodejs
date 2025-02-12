const path = require("path");
const URL = require("../modules/url");
const DeletedUrl = require("../modules/deletedurl");
const PriceofUrl = require("../modules/priceofurl");
const multer = require("multer");

const profileImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./profileImage");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadProfileImage = multer({ storage: profileImageStorage });

async function handleviewuser(req, res) {
  const searchQuery = req.query.search;
  let allurls;

  if (searchQuery) {
    allurls = await URL.find({
      name: { $regex: new RegExp(searchQuery, "i") },
    });
  } else {
    allurls = await URL.find({});
  }

  allurls.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const prices = await PriceofUrl.find();
  return res.render("viewuser", {
    urls: allurls,
    path: path,
    prices: prices,
  });
}

async function handleEditUser(req, res) {
  const username = req.params.name;

  const user = await URL.findOne({
    name: username,
  });

  if (user) {
    return res.render("edituser", {
      user: user,
      path: path,
    });
  } else {
    return res.status(404).sendStatus("User not found");
  }
}

async function handleUpdateUser(req, res) {
  const userName = req.params.name;

  // If a new profile picture is uploaded, use its path, otherwise keep the old one
  const profileImagePath = req.file
    ? `C:/Users/DeLL/OneDrive/Desktop/Practice/profileImage/${req.file.filename}`
    : req.body.profileImage;

  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    phoneno: req.body.phoneno,
    profileImage: profileImagePath,
  };

  try {
    const updatedUser = await URL.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${userName}$`, "i") } },
      updatedData,
      { new: true }
    );

    if (updatedUser) {
      return res.redirect("/url/viewuser"); // Redirect back to the user list after updating
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
}

async function handleDeleteUser(req, res) {
  const userName = req.params.name;

  try {
    // Find the user by name
    const user = await URL.findOne({
      name: { $regex: new RegExp(`^${userName}$`, "i") },
    });

    if (user) {
      // Copy user data to DeletedUrl collection
      const deletedUser = new DeletedUrl(user.toObject());
      await deletedUser.save();

      // Delete the user from the original collection
      await URL.deleteOne({
        name: { $regex: new RegExp(`^${userName}$`, "i") },
      });

      return res.redirect("/url/viewuser"); // Redirect back to the user list after deletion
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
}

async function handleUserPrice(req, res) {
  const userName = req.params.name;
  const { startdate, cars: price, enddate } = req.body;

  try {
    // Check if the user already has a price entry
    const existingPrice = await PriceofUrl.findOne({ name: userName });

    if (existingPrice) {
      // If an entry exists, update it
      existingPrice.startDate = new Date(startdate).getTime();
      existingPrice.price = parseInt(price, 10);
      existingPrice.endDate = new Date(enddate).getTime();

      await existingPrice.save();
    } else {
      // If no entry exists, create a new one
      await PriceofUrl.create({
        name: userName,
        startDate: new Date(startdate).getTime(), // Convert startdate to timestamp
        price: parseInt(price, 10), // Convert price to an integer
        endDate: new Date(enddate).getTime(), // Convert enddate to timestamp
      });
    }

    return res.redirect("/url/viewuser"); // Redirect after saving the price data
  } catch (error) {
    return res.status(500).send("Server Error");
  }
}

module.exports = {
  handleviewuser,
  handleEditUser,
  handleUpdateUser,
  handleDeleteUser,
  handleUserPrice,
  uploadProfileImage,
};
