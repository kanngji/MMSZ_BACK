// db에 테이블이름이 쌓임

const express = require("express");
const {
  createBoard,
  getBoards,
  getBoard,
  deleteBoard,
  updateBoard,
} = require("../controllers/boardController");

// const requireAuth = require("../middleware/requireAuth");  사용자 인증 미들웨어 댓글쓰기때 쓰면 좋을듯

const router = express.Router();
// require auth for all board routes

// router.use(requireAuth);

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
