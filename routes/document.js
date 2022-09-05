const express = require("express");
const router = express.Router();

const documentController = require("../controllers/document");

router.get("/", documentController.index);

router.get("/data", documentController.data);

router.get("/new", documentController.createGet);

router.post("/new", documentController.createPost);

router.get("/delete/:id", documentController.deleteGet);

router.post("/delete", documentController.delete);

module.exports = router;
