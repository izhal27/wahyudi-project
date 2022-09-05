const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("document", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nama_user: {
      type: DataTypes.STRING,
    },
    nama_kantor: {
      type: DataTypes.STRING,
    },
    nama_file: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
};
