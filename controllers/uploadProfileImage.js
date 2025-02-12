const multer = require("multer");
const { handleGenerateNewUrl } = require("../controllers/url");
const { handleGenerateNewTeam } = require("../controllers/team");
const { handleGenerateNewReview } = require("../controllers/review");
const { handleGenerateNewService } = require("../controllers/service");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const ProfileImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./profileImage"); // Save in profileImage folder
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadProfileImage = multer({ storage: ProfileImageStorage });

async function handleUploadProfileImage(req, res) {
  try {
    const profileImageLocation = `D:/Practice/profileImage/${req.file.filename}`;

    // You can save the image path to MongoDB here, or pass it along to another route
    // For example, passing it to a controller to save with user data
    req.body.profileImage = profileImageLocation;

    // Redirect to a controller or handle saving in the DB
    return handleGenerateNewUrl(req, res);
  } catch (error) {
    res.status(500).send("An error occurred during uploading profile image");
  }
}

const teamImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads"); // Save in profileImage folder
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadTeamImage = multer({ storage: teamImageStorage });

async function handleUploadImage(req, res) {
  try {
    const TeamImageLocation = `D:/Practice/uploads/${req.file.filename}`;

    // You can save the image path to MongoDB here, or pass it along to another route
    // For example, passing it to a controller to save with user data
    req.body.teamimage = TeamImageLocation;

    return handleGenerateNewTeam(req, res);
  } catch (error) {
    return res.render("uploadteamimages", {
      error: "An error occurred during uploading teams.",
    });
  }
}

const reviewImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./reviews");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadReviewImage = multer({ storage: reviewImageStorage });

async function handleUploadReviewImage(req, res) {
  try {
    const reviewImageLocation = `D:/Practice/reviews/${req.file.filename}`;

    req.body.profilepic = reviewImageLocation;
    return handleGenerateNewReview(req, res);
  } catch (error) {
    return res.render("uploadreview", {
      error: "An error occurred during uploading review.",
    });
  }
}

const ItemsImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./items");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadItemsImage = multer({ storage: ItemsImageStorage });

async function handleUploadItemsImage(req, res) {
  try {
    const itemsImageLocation = `D:/Practice/items/${req.file.filename}`;

    req.body.photo = itemsImageLocation;
    return handleGenerateNewService(req, res);
  } catch (error) {
    return res.render("uploadservice", {
      error: "An error occurred during uploading Items",
    });
  }
}

module.exports = {
  upload,
  uploadTeamImage,
  uploadProfileImage,
  uploadReviewImage,
  uploadItemsImage,
  handleUploadItemsImage,
  handleUploadProfileImage,
  handleUploadImage,
  handleUploadReviewImage,
};
