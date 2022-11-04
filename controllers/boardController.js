const Board = require("../models/boardModel");
const mongoose = require("mongoose");

// get all boards
const getBoards = async (req, res) => {
  const boards = await Board.find({}).sort({ createdAt: -1 });
  res.status(200).json(boards);
};

// get a single board
const getBoard = async (req, res) => {
  const { id } = req.params; // :id
  console.log("!");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such board" });
  }

  const board = await Board.findById(id);

  if (!board) {
    return res.status(404).json({ error: "No such board" });
  }

  res.status(200).json(board);
};
// create increase view
const incView = async (req, res) => {
  console.log(req.params);
  const result = await Board.collection.updateOne(
    { seq: parseInt(req.params.id) },
    { $inc: { view: +1 } }
  );
  console.log(result);
};
// plus like
const incLike = async (req, res) => {
  console.log(req.params);
  const result = await Board.collection.updateOne(
    { seq: parseInt(req.params.id) },
    { $inc: { like: +1 } }
  );
  if (result.acknowledged) {
    res.send(JSON.stringify("좋아요 추가"));
  }
};

// create new board
const createBoard = async (req, res) => {
  const { seq, title, content, view, like, writtenTime } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in title", emptyFields });
  }

  // add doc to db
  try {
    const board = await Board.create({
      seq,
      title,
      content,
      view,
      like,
      writtenTime,
    });
    const sequenceDocument = await res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a board
const deleteBoard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such board" });
  }

  const board = await Board.findOneAndDelete({ _id: id });

  if (!board) {
    return res.status(404).json({ error: "No such board" });
  }
  res.status(200).json(board);
};

// update a workout
const updateBoard = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such board" });
  }
  const board = await Board.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!board) {
    return res.status(404).json({ error: "No such board" });
  }
  res.status(200).json(board);
};

module.exports = {
  createBoard,
  getBoard,
  getBoards,
  deleteBoard,
  updateBoard,
  incView,
  incLike,
};
