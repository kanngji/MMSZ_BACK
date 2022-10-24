const mongoose = require("mongoose");
// 자동증가를 위해서
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    // 글번호
    //   seq: {
    //     type: Number,
    //     default: 0,
    //   },
    // 제목
    title: {
      type: String,
      required: true,
    },
    // 내용
    content: {
      type: String,
    },
    // 조회수
    view: {
      type: Number,
      dafault: 0,
    },
    // 추천수
    like: {
      type: Number,
      defualt: 0,
    },
    //작성일자
    writtenTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 모듈 꺼내기
module.exports = mongoose.model("Board", boardSchema);
