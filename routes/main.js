const express = require("express");

const {
  handlegetteams,
  handlegetvisibleitems,
  handlegetallitems,
  handlegetreviews,
  handleCheckout,
  handlegetbestSellingproducts,
} = require("../controllers/image");

const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/allteams", handlegetteams);
router.get("/visibleproducts", handlegetvisibleitems);
router.get("/allproducts", handlegetallitems);
router.get("/bestselling", handlegetbestSellingproducts);
router.get("/allreviews", handlegetreviews);
router.get("/checkout", restrictToLoggedinUserOnly, handleCheckout);

module.exports = router;
