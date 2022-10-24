// db에 테이블이름이 쌓임

const express = require("express");
const {
  createBoard,
  getBoards,
  getBoard,
  deleteBoard,
  updateBoard,
} = require("../controllers/boardController");

const router = express.Router();

// GET all boards
router.get("/", getBoards);

// GET a single board
router.get("/:id", getBoard);

// POST a new board
router.post("/", createBoard);

// DELETE a board
router.delete("/:id", deleteBoard);

// UPDATE a board
router.patch("/:id", updateBoard);
module.exports = router;
