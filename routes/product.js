const express = require("express");

// controller functions
const {
  pushAllProduct,
  getAllProduct,
  writeReivew,
  deleteReivew,
  addFavorite,
  deleteFavorite,
} = require("../controllers/productController");

const router = express.Router();

// push router
router.post("/push", pushAllProduct);

// getAll router
router.get("/getAll", getAllProduct);

// write router
router.post("/write", writeReivew);

// delete router
router.post("/delete", deleteReivew);

// add favorite
router.post("/favorite", addFavorite);

// del favorite
router.post("/delFavorite", deleteFavorite);

module.exports = router;
