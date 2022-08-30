module.exports = (req, res, next) => {
  console.log(req.session.email);
  if (req.session.email) {
    next();
  } else {
    res.redirect("/login");
  }
};
