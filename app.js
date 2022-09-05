const path = require("path");
const express = require("express");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");

const sequelize = require("./database");
const auth = require("./middlewares/auth");
const indexRoutes = require("./routes");
const documentRoutes = require("./routes/document");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const signupRoutes = require("./routes/signup");
const app = express();
const oneDay = 1000 * 60 * 60 * 24;
const sessionConfig = {
  secret: "secretkey",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "upload"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("pdf")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const maxSize = 2 * 1024 * 1024; // max file 2mb

// set the view engine to ejs
app.set("view engine", "ejs");
// set public folder
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./upload")));
app.use(sessions(sessionConfig));

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});
app.use(
  "/document",
  multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  }).single("document"),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "File disarankan tidak melebihi dari 2 mb!" });
    }

    next();
  }
);
app.use("/", indexRoutes);
app.use("/login", loginRoutes);
app.use("/document", auth, documentRoutes);
app.use("/logout", logoutRoutes);
app.use("/signup", signupRoutes);
app.get("*", function (req, res) {
  res.render("pages/404");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
}

init();
