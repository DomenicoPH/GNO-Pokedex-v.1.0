const { DataTypes } = require("sequelize"); // Modelo Pokemon (id,name,image,hp,attack,defense,speed,height,weight)

module.exports = (sequelize) => {
  sequelize.define(
    "pokemon",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Ataque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Defensa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Velocidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Altura: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      Peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
