const express = require("express");
const router = express.Router();

const logoutController = require("../controllers/logout");

module.exports = router.get("/", logoutController.logout);
