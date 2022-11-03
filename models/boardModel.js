const mongoose = require("mongoose");
// 자동증가를 위해서
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    // 글번호
    seq: {
      type: Number,
      default: 0,
    },
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

      default: 0,
    },
    // 추천수
    like: {
      type: Number,

      default: 0,
    },
    //작성일자
    writtenTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
  { collection: "", versionKey: false }
);

// static check method
boardSchema.statics.checkboard = async function (
  seq,
  title,
  content,
  view,
  like,
  writtenTime
) {
  // validation
  if (!title) {
    throw Error("Title must be filled");
  }

  const board = await this.create({
    seq,
    title,
    content,
    view,
    like,
    writtenTime,
  });
  return board;
};
boardSchema.plugin(autoIncrement.plugin, {
  model: "boardModel",
  field: "seq",
  startAt: 1, // 시작
  increment: 1, //증가
});

// 모듈 꺼내기
module.exports = mongoose.model("Board", boardSchema);
