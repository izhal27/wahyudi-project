const bcrypt = require("bcrypt");

const { models } = require("../database");

exports.loginGet = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("pages/login", {
    user: null,
  });
};

exports.loginPost = async (req, res) => {
  if (req.body.email && req.body.password) {
    const { email, password } = req.body;

    try {
      const user = await models.user.findOne({
        where: { email: email },
      });
      const result = await bcrypt.compare(password, user.password);

      if (user && user.email === email && result) {
        req.session.user = { email: user.email, username: user.username };
        res.redirect("/document");
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.redirect("/login");
    }
  } else {
    res.status(500).send({ message: "Username dan password harus ada." });
  }
};
