const Product = require("../models/productModel");
const { mongoose } = require("mongoose");
const data = require("../src/data");

// push all product
const pushAllProduct = async (req, res) => {
  let result;
  for (let i = 0; i < data.length; i++) {
    result = await Product.collection.insertOne(data[i]);
  }
  res.status(200).json(result);
};

// get all product
const getAllProduct = async (req, res) => {
  const data = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(data);
};

// write a review
const writeReivew = async (req, res) => {
  console.log(req.body);
  const result = await Product.collection.updateOne({ _id: req.body._id }, { $addToSet: { review: req.body.review }, $set: { rating: req.body.avg, numReviews: req.body.numReviews } });
  res.status(200).json(result);
};

module.exports = {
  getAllProduct,
  pushAllProduct,
  writeReivew,
};
