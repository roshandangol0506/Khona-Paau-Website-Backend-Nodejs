const multer = require("multer");
const { handleGenerateNewUrl } = require("../controllers/url");
const { handleGenerateNewTeam } = require("../controllers/team");
const { handleGenerateNewReview } = require("../controllers/review");
const {
  handleGenerateNewService,
  handleEditItems,
} = require("../controllers/service");
const {
  handleUpdateGeneralSetting,
  handleEditGeneralSetting,
} = require("../controllers/generalsetting");

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
    const profileImageLocation = req.file.filename;

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
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadTeamImage = multer({ storage: teamImageStorage });

async function handleUploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const TeamImageLocation = req.file.filename;
    req.body.teamimage = TeamImageLocation;

    return handleGenerateNewTeam(req, res);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during upload." });
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
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const reviewImageLocation = req.file.filename;

    req.body.profilepic = reviewImageLocation;
    return handleGenerateNewReview(req, res);
  } catch (error) {
    return res.status.json({
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
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const itemsImageLocation = req.file.filename;

    req.body.photo = itemsImageLocation;
    return handleGenerateNewService(req, res);
  } catch (error) {
    return res.status.json({
      error: "An error occurred during uploading Services.",
    });
  }
}

const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./logo");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadlogoImage = multer({ storage: logoStorage });

async function handleUploadLogo(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const LogoLocation = req.file.filename;
    req.body.logo = LogoLocation;

    return handleUpdateGeneralSetting(req, res);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during upload." });
  }
}

async function handleEditProduct(req, res) {
  try {
    if (req.file) {
      const itemsImageLocation = req.file.filename;
      req.body.photo = itemsImageLocation;
    }

    return handleEditItems(req, res);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during upload." });
  }
}

async function handleEditLogo(req, res) {
  try {
    if (req.file) {
      const LogoLocation = req.file.filename;
      req.body.logo = LogoLocation;
    }

    return handleEditGeneralSetting(req, res);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during upload." });
  }
}

module.exports = {
  upload,
  uploadTeamImage,
  uploadProfileImage,
  uploadReviewImage,
  uploadItemsImage,
  uploadlogoImage,
  handleUploadItemsImage,
  handleUploadProfileImage,
  handleUploadImage,
  handleUploadReviewImage,
  handleUploadLogo,
  handleEditProduct,
  handleEditLogo,
};
