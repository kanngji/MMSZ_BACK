const Product = require("../models/productModel");
const { mongoose } = require("mongoose");
const data = require("../src/data");

// push all product
const pushAllProduct = async (req, res) => {
  console.log(Product);
  const result = await Product.collection.insertOne(data);
  res.status(200).json(result);
};

// get all product
const getAllProduct = async (req, res) => {
  const events = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(events);
};

module.exports = {
  getAllProduct,
  pushAllProduct,
};
