const express = require("express");
const path = require("path");
const SERVICE = require("../modules/service");
const {
  restrictToLoggedinUserOnly,
  restrictToLoggedinAdminOnly,
  checkAuth,
} = require("../middleware/auth");
const { handleimage } = require("../controllers/image");
const URL = require("../modules/url");
const { checkGoogleAuth } = require("../middleware/googlecheckauth");

const router = express.Router();

// Route to render the main.ejs page with images
router.get("/", checkAuth, handleimage);

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/adminlogin", (req, res) => {
  return res.render("adminlogin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/adminsignup", (req, res) => {
  return res.render("adminsignup");
});

router.get("/uploadteamimages", restrictToLoggedinAdminOnly, (req, res) => {
  return res.render("uploadimage");
});

router.get("/uploadservice", restrictToLoggedinAdminOnly, async (req, res) => {
  let allservices = await SERVICE.find({});
  return res.render("service", { service: allservices });
});

router.get("/uploadreview", restrictToLoggedinAdminOnly, (req, res) => {
  return res.render("review");
});

router.get("/products", checkAuth, async (req, res) => {
  let allservices = await SERVICE.find({ visible: "on" });
  return res.render("items", {
    service: allservices,
    user: req.user,
    path: path,
  });
});

router.get("/description", checkAuth, async (req, res) => {
  const serviceId = req.query.id;
  const allservices = await SERVICE.findById(serviceId);
  return res.render("items_description", {
    service: allservices,
    user: req.user,
    path: path,
  });
});

module.exports = router;
