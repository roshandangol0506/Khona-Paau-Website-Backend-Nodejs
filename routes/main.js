const express = require("express");

const { handleimage } = require("../controllers/image");

const router = express.Router();

// Route to render the main.ejs page with images (keeping it for separate access)
router.get("/main", handleimage);

module.exports = router;


//this route in not in used