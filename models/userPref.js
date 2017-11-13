"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserPref = sequelize.define(
    "UserPref",
    {
      userPrefId: {
        type: DataTypes.INTEGER,
        autoIncrement: true, //allow ID key to auto-generate
        primaryKey: true
      },
      userId: DataTypes.INTEGER,
      currentTitle: DataTypes.STRING(150),
      department: DataTypes.STRING(150),
      industry: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );

  return UserPref;
};
