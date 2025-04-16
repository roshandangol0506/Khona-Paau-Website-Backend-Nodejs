const express = require("express");
const multer = require("multer");

const {
  handleGenerateNewService,
  handleDisableItems,
  handleEnableItems,
  handleBestSelling,
  handleDeleteItems,
  handleGetSpecificItems,
  handleEditItems,
} = require("../controllers/service");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/product/:product_id", handleGetSpecificItems);
router.post("/uploadservi", handleGenerateNewService);
router.post("/disableitem", handleDisableItems);
router.put("/enableitem/:id", handleEnableItems);
router.put("/bestselling/:id", handleBestSelling);
router.delete("/deleteitem/:product_id", handleDeleteItems);
router.put("/edititem/:product_id", upload.single("photo"), handleEditItems);

module.exports = router;
