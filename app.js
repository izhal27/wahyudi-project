const path = require("path");
const express = require("express");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const flash = require("req-flash");

const auth = require("./middlewares/auth");
const indexRoutes = require("./routes");
const documentRoutes = require("./routes/document");

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
const sessionConfig = {
  secret: "secretkey",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
};

// set the view engine to ejs
app.set("view engine", "ejs");
// set public folder
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./upload")));
app.use(sessions(sessionConfig));
app.use(flash());

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});
app.use("/", indexRoutes);
app.use("/document", auth, documentRoutes);
app.get("*", function (req, res) {
  res.render("pages/404");
});

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
