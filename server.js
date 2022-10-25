require("dotenv").config();

const express = require("express");
//mongoose
const mongoose = require("mongoose");
// routes 의 boards를 가져옵니다
const boardRoutes = require("./routes/boards");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT;

// middle ware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
// baordRoutes를 사용한다고 선언
app.use("/api/boards", boardRoutes);
app.use("/api/user", userRoutes);
// connet to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // db연결이 되어야지 서버가 열립니다.
    app.listen(PORT, () => {
      console.log(`connected to db & This server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
