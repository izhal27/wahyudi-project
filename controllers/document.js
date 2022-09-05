const fs = require("fs");

const { models } = require("../database");

exports.index = (req, res) => {
  res.render("pages/document", { user: req.session?.user });
};

exports.data = async (req, res) => {
  const documents = await models.document.findAll();
  res.send({ data: documents });
};

exports.createGet = (req, res) => {
  res.render("pages/new-document", { user: req.session?.user });
};

exports.createPost = async (req, res) => {
  if (req.body.nama_kantor && req.file) {
    await models.document.create({
      nama_user: req.session.user.username,
      nama_kantor: req.body.nama_kantor,
      nama_file: req.file.originalname,
      path: req.file.path,
      date: Date.now(),
    });

    res.status(201).send({ message: "File berhasil diupload!" });
  } else {
    res.status(409).send({ message: "Nama kantor dan document harus diisi." });
  }
};

exports.deleteGet = async (req, res) => {
  if (req.params.id) {
    const data = await models.document.findByPk(req.params.id);
    return res.render("pages/delete", { user: req.session?.user, data });
  }

  res.redirect("/");
};

exports.delete = async (req, res) => {
  const document = await models.document.findByPk(req.body.id);
  if (document) {
    fs.access(document.path, (err) => {
      if (!err) {
        fs.unlinkSync(document.path);
      }

      document.destroy();
      res.redirect("/document");
    });
  } else {
    res.status(500).send("Document does not found");
  }
};
