const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// 토큰 생성하기
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ user, email, token });
    console.log("로그인성공");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    const user = await User.signup(email, password, isAdmin);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, email, token });
    console.log("회원가입 성공");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
