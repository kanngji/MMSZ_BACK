const express = require("express");

const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`This server is running on ${PORT}`);
});
