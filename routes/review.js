const express = require("express");

const {
  handleGenerateNewReview,
  handleDeleteReviews,
  handleGetSpecificReview,
  handleEditReview,
} = require("../controllers/review");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/review/:review_id", handleGetSpecificReview);
router.post("/", handleGenerateNewReview);
router.delete("/deletereview/:review_id", handleDeleteReviews);
router.put("/editreview/:review_id", upload.single("photo"), handleEditReview);

module.exports = router;
