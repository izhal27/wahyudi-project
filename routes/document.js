const express = require("express");
const router = express.Router();

module.exports = router.get("/", (req, res) => {
  res.send("get document");
});

module.exports = router.post("/", (req, res) => {
  res.send("success upload document");
});
