const express = require("express");

const {
  handleviewuser,
  handleEditUser,
  handleUpdateUser,
  handleDeleteUser,
  handleUserPrice,
  uploadProfileImage,
} = require("../controllers/viewuser");

const router = express.Router();

router.get("/viewuser", handleviewuser);

router.get("/edituser/:name", handleEditUser);
router.post(
  "/updateuser/:name",
  uploadProfileImage.single("profilepic"),
  handleUpdateUser
);

router.post("/deleteuser/:name", handleDeleteUser);

router.post("/adduserprice/:name", handleUserPrice);

module.exports = router;
