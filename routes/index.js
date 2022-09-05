const express = require("express");
const router = express.Router();

module.exports = router.get("/", (req, res) => {
  res.render("pages/index", { user: req.session.user });
});
