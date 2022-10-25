const mongoose = require("mongoose");
// bcrypt 사용하기 해쉬 비번
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  // 닉네임
  nickname: {
    type: String,
    require: true,
  },
  //이메일
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //비밀번호
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (nickname, email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  // salt 생성 bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // 비밀번호에 hash 뭍히기
  const user = await this.create({ nickname, email, password: hash });
  return user;
};

module.exports = mongoose.model("User", userSchema);
