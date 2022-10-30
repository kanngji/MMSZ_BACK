const express = require("express");

const router = express.Router();

const data = require("../src/data");

// 상품 데이터 전체 받아오기
router.get("/getdata", (req, res) => {
  res.send(data);
});

module.exports = router;
