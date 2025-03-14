const express = require("express");

const {
  handlegetteams,
  handlegetvisibleitems,
  handlegetallitems,
  handlegetreviews,
  handleCheckout,
} = require("../controllers/image");

const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/allteams", handlegetteams);
router.get("/visibleproducts", handlegetvisibleitems);
router.get("/allproducts", handlegetallitems);
router.get("/allreviews", handlegetreviews);
router.get("/checkout", restrictToLoggedinUserOnly, handleCheckout);

module.exports = router;
