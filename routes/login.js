const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.get("/", loginController.loginGet);

router.post("/", loginController.loginPost);

module.exports = router;
