"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true, //allow ID key to auto-generate
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true //test with sequelize in-built function if uesr has entered email
        }
      },
      password: DataTypes.TEXT,
      currentTitle: DataTypes.STRING(150),
      company: DataTypes.STRING(150),
      department: DataTypes.STRING(150),
      industry: DataTypes.INTEGER,
      bio: DataTypes.TEXT,
      education: DataTypes.TEXT,
      prevOrg: DataTypes.TEXT,
      availability: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  );
  return User;
};
