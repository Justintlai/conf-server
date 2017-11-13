"use strict";
module.exports = (sequelize, DataTypes) => {
  const Industry = sequelize.define(
    "Industry",
    {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return Industry;
};
