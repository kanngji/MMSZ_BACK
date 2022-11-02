require("dotenv").config();
const cors = require('cors');

const express = require("express");
const mongoose = require("mongoose");
// routes 의 boards를 가져옵니다
const boardRoutes = require("./routes/boards");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const productRoutes = require("./routes/product");

const app = express();
const PORT = process.env.PORT;

// middle ware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/boards", boardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/product", productRoutes);
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
