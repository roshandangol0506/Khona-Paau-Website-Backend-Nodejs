const express = require("express");
const {
  handleGenerateNewMyCart,
  handleMyCart,
  handleDeleteMyCart,
} = require("../controllers/mycart");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const router = express.Router();

router.post("/uploadmycart", handleGenerateNewMyCart);

router.get("/mycart", restrictToLoggedinUserOnly, handleMyCart);

router.post("/deletefromcart", handleDeleteMyCart);

module.exports = router;
