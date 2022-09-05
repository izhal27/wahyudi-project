const express = require("express");
const router = express.Router();

const signupCongroller = require("../controllers/signup");

router.get("/", signupCongroller.signupGet);

router.post("/", signupCongroller.signupPost);

module.exports = router;
