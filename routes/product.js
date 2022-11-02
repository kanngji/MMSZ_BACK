const express = require("express");

// controller functions
const {
  pushAllProduct,
  getAllProduct,
  writeReivew,
} = require("../controllers/productController");

const router = express.Router();

// push router
router.post("/push", pushAllProduct);

// getAll router
router.get("/getAll", getAllProduct);

// write router
router.post("/write", writeReivew);



module.exports = router;
