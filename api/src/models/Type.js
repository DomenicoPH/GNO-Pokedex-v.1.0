const { DataTypes } = require("sequelize"); // Modelo Pokemon (id,name)

module.exports = (database) => {
  database.define(
    "type",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
