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

// get a single event
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValeid(id)) {
    return res.status(404).json({ error: "No such event" });
  }
  const event = await Product.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

// create a new event
const createEvent = async (req, res) => {
  const { brandname, title, content, postDate } = req.body;

  // add doc to db
  try {
    const event = await Product.create({
      brandname,
      title,
      content,
      postDate,
      eventImage: req.file.eventImage,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Product.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }
  res.status(200).json(event);
};

// update a event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }
  const event = await Product.findOneAndUpdate(
    {
      _id: id,
    },
    { ...req.body }
  );
  if (!event) {
    return res.status(404).json({ error: "No such board" });
  }
  res.status(200).json(event);
};

module.exports = {
  createEvent,
  getEvent,
  getAllProduct,
  pushAllProduct,
  deleteEvent,
  updateEvent,
};
