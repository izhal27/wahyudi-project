const express = require("express");
const router = express.Router();

// data user sementara
// bisa di ganti dengan database
const users = [
  {
    email: "user@user.com",
    password: "user",
  },
];

module.exports = router.get("/", (req, res) => {
  res.render("pages/index", { email: req.session.email });
});

module.exports = router.get("/login", (req, res) => {
  if (req.session.email) {
    return res.redirect("/");
  }

  res.render("pages/login", {
    email: req.session.email,
    flashMessage: req.flash("message"),
  });
});

module.exports = router.post("/login", (req, res) => {
  if (
    req.body.email === users[0].email &&
    req.body.password === users[0].password
  ) {
    req.session.email = users[0].email;
    res.redirect("/");
  } else {
    req.flash("message", "email atau password salah");
    res.redirect("/login");
  }
});

module.exports = router.get("/logout", (req, res) => {
  if (req.session.email) {
    req.session.destroy();
    res.redirect("/login");
  } else {
    res.send("you are not currently logged in");
  }
});
