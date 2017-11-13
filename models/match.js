"use strict";

module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      matchId: {
        type: DataTypes.INTEGER,
        autoIncrement: true, //allow ID key to auto-generate
        primaryKey: true
      },
      userId: DataTypes.INTEGER,
      connectedUserId: DataTypes.INTEGER,
      score: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true
    },
    {
      associate: models => {
        Match.belongsToMany(models.User, { foreignKey: "userId" });
      }
    }
  );

  // return Match;
};
