const bcrypt = require("bcrypt");

const { models } = require("../database");

exports.signupGet = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("pages/signup", {
    user: null,
  });
};

exports.signupPost = async (req, res) => {
  if (req.body.username && req.body.email && req.body.password) {
    const user = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    try {
      await models.user.create(user);
      res.status(201).send({
        message:
          "Registrasi anda berhasil, silahkan login menggunakan email yang anda daftarkan.",
      });
    } catch (error) {
      res.status(409).send({ message: "Email atau username sudah digunakan." });
    }
  } else {
    res
      .status(500)
      .send({ message: "Username, email dan password harus ada." });
  }
};
