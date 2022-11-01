const express = require("express");

// controller functions
const {
  pushAllProduct,
  getAllProduct,
} = require("../controllers/productController");

const router = express.Router();

// login route
router.post("/push", pushAllProduct);

// signup router
router.get("/getAll", getAllProduct);

module.exports = router;
