const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reivewSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userNickname: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    review: {
      type: Array,
      required: false,
    }
  },
  { timestamps: true }
);

// static event method
productSchema.statics.checkevent = async function (
  _id,
  name,
  category,
  image,
  price,
  brand,
  rating,
  numReviews,
  description,
  review
) {
  // validation
  if (!_id || !name || !category || !image || !price || !brand || !description) {
    throw Error(
      "_id, name, category, image, price, brand, description are must be filled"
    );
  }
  const product = await this.create({
    _id,
    name,
    category,
    image,
    price,
    brand,
    rating,
    numReviews,
    description,
    review
  });
  return product;
};

module.exports = mongoose.model("Product", productSchema);
