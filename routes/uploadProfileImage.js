const express = require("express");
const {
  uploadTeamImage,
  uploadProfileImage,
  uploadReviewImage,
  uploadItemsImage,
  handleUploadItemsImage,
  handleUploadProfileImage,
  handleUploadImage,
  handleUploadReviewImage,
  uploadlogoImage,
  handleUploadLogo,
  handleEditLogo,
  handleEditProduct,
} = require("../controllers/uploadProfileImage");
const router = express.Router();

router.post(
  "/uploadProfileImage",
  uploadProfileImage.single("profilepic"),
  handleUploadProfileImage
);

router.post(
  "/uploadteamimages",
  uploadTeamImage.single("teamimages"),
  handleUploadImage
);

router.post(
  "/uploadreviewimages",
  uploadReviewImage.single("profilepic"),
  handleUploadReviewImage
);

router.post(
  "/uploaditemsimages",
  uploadItemsImage.single("photo"),
  handleUploadItemsImage
);

router.post(
  "/uploadgeneralsetting",
  uploadlogoImage.single("logo"),
  handleUploadLogo
);

router.put(
  "/edititems/:product_id",
  uploadItemsImage.single("photo"),
  handleEditProduct
);

router.post(
  "/editgeneralsetting",
  uploadlogoImage.single("logo"),
  handleEditLogo
);

module.exports = router;
