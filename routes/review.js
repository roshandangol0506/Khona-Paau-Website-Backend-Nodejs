const express = require('express');

const {handleGenerateNewReview}=require("../controllers/review");

const router= express.Router();

router.post("/", handleGenerateNewReview);

module.exports = router;