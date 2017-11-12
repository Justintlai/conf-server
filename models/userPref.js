'use strict';

module.exports = function(sequelize, DataTypes) {
  const UserPref = sequelize.define(
    'UserPref',
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
    },
    {
      associate: function(models) {
        UserPref.hasOne(models.User, {
          foreignKey: 'userId',
          targetKey: 'userId'
        });
      }
    }
  );

  return UserPref;
};
