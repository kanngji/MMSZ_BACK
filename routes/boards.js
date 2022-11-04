// db에 테이블이름이 쌓임

const express = require("express");
const {
  createBoard,
  getBoards,
  getBoard,
  deleteBoard,
  updateBoard,
  incView,
  incLike,
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
// POST a inc view
router.post("/:id", incView);
// plus like
router.post("/like/:id", incLike);
// DELETE a board
router.delete("/:id", deleteBoard);

// UPDATE a board
router.post("/:id", updateBoard);
module.exports = router;
