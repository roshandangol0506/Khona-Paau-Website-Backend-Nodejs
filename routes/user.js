const express = require("express");
const {
  handleUserLogin,
  handleAdminLogin,
  handleUserSignup,
  handleAdminSignup,
  handleUserLogout,
} = require("../controllers/user");

const router = express.Router();

router.post("/adminlogin", handleAdminLogin);
router.post("/admin", handleAdminSignup);
router.post("/userlogin", handleUserLogin);
router.post("/", handleUserSignup);
router.get("/logout", handleUserLogout);

module.exports = router;
