const express = require("express");
const {
  handleUserLogin,
  handleAdminLogin,
  handleUserSignup,
  handleAdminSignup,
  handleUserLogout,
  handleEditAdmin,
  handleGetAdmin,
  handleChangeUserPassword,
} = require("../controllers/user");

const router = express.Router();

router.get("/getadmin", handleGetAdmin);
router.post("/adminlogin", handleAdminLogin);
router.post("/admin", handleAdminSignup);
router.post("/userlogin", handleUserLogin);
router.post("/", handleUserSignup);
router.get("/logout", handleUserLogout);
router.post("/editadmin", handleEditAdmin);
router.post("/changepassword", handleChangeUserPassword);

module.exports = router;
