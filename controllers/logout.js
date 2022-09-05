exports.logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.redirect("/login");
  } else {
    res.redirect("/");
  }
};
