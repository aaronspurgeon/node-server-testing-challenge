const express = require("express");
const foodModel = require("./food/food-model");

const server = express();
const port = process.env.PORT || 5050;

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome"
  });
});

server.get("/food", async (req, res, next) => {
  try {
    const food = await foodModel.list();
    res.status(200).json(food);
  } catch (err) {
    next(err);
  }
});

server.post("/food", async (req, res, next) => {
  try {
    const food = await foodModel.insert(req.body);
    res.status(201).json(hobbit);
  } catch (err) {
    next(err);
  }
});

server.use((err, req, res, next) => {
  console.log("Error:", err);
  res.status(500).json({
    message: "Something went wrong"
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`\n=> Server up at http://localhost:${port}\n`);
  });
}

module.exports = server;
