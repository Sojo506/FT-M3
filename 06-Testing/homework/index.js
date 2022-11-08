const express = require("express");
const app = express();
const { sumArray, findProperty } = require("./utils.js");
app.use(express.json()); // for parsing application/json

// GET METHOD
app.get("/", (req, res) => {
  res.json({
    message: "hola",
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "test",
  });
});

// POST METHOD
app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  res.json({
    result: a + b,
  });
});

app.post("/product", (req, res) => {
  const { a, b } = req.body;

  res.json({
    result: a * b,
  });
});

app.post("/sumArray", (req, res) => {
  const { array, num } = req.body;
  const result = sumArray(array, num);

  if (!array || !num) return res.sendStatus(500);
  return res.send({
    result,
  });
});

app.post("/numString", (req, res) => {
  const { word } = req.body;
  if (!word || typeof word === "number") return res.sendStatus(400);
  const result = word.length;

  if (word === "Hola") {
    res.send({ result });
  }
});

app.post("/pluck", (req, res) => {
  const { arr, prop } = req.body;
  if (!Array.isArray(arr) || !prop) return res.sendStatus(400);
  const result = findProperty(arr, prop);

  res.send({ result });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
