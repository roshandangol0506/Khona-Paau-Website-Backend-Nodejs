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

module.exports = router;
