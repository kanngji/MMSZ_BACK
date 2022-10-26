const mongoose = require("mongoose");
// bcrypt 사용하기 해쉬 비번
const bcrypt = require("bcrypt");
const validator = require("validator");

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
  isAdmin: {
    type: Boolean,
    default: false,
    require: true,
  },
});

// static signup method
userSchema.statics.signup = async function (
  nickname,
  email,
  password,
  isAdmin
) {
  // validation
  if (!nickname || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  // password 강화 해야함 ex)abcABC123!
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  // salt 생성 bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // 비밀번호에 hash 뭍히기
  const user = await this.create({ nickname, email, password: hash, isAdmin });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  // hashed password 와 user.password가 같은지 확인
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
