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
  const result = await Product.collection.updateOne(
    { _id: req.body._id },
    {
      $addToSet: { review: req.body.review },
      $set: { rating: req.body.avg, numReviews: req.body.numReviews },
    }
  );
  res.status(200).json(result);
};

// delete a review
const deleteReivew = async (req, res) => {
  const result = await Product.collection.updateOne(
    { name: req.body.product },
    {
      $pull: {
        review: { _id: req.body._id },
      },
      $inc: {
        numReviews: -1,
      },
    }
  );
  if (result.acknowledged) {
    res.status(200).json("삭제 완료");
  }
};

const addFavorite = async (req, res) => {
  console.log(req.body);
  const result = await Product.collection.updateOne(
    { name: req.body.product },
    {
      $addToSet: {
        favorite: req.body.userEmail,
      },
    }
  );
  if (result.acknowledged) {
    res.status(200).json("나만의 음료 추가 완료");
  }
};

const deleteFavorite = async (req, res) => {
  console.log(req.body);
  const result = await Product.collection.updateOne(
    { name: req.body.product },
    {
      $pull: {
        favorite: req.body.userEmail,
      },
    }
  );
  if (result.acknowledged) {
    res.status(200).json("나만의 음료 취소 완료");
  }
};

module.exports = {
  getAllProduct,
  pushAllProduct,
  writeReivew,
  deleteReivew,
  addFavorite,
  deleteFavorite,
};
