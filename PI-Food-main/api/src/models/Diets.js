const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'Diet',
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoincremet: true,
      //   primaryKey: true
      // },
      nombre: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    { timestamps: false }
  );
};
