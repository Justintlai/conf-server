'use strict';
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
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
      education: DataTypes.JSON,
      prevOrg: DataTypes.JSON,
      availability: DataTypes.JSON
    },
    {
      timestamps: false
    },
    {
      classMethods: {
        validPassword: function(password, passwd, done, user) {
          bcrypt.compare(password, passwd, function(err, isMatch) {
            if (err) console.log(err);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        },
        associate: function(models) {
          User.hasMany(models.Match, { foreignKey: 'userId' });
          User.hasMany(models.UserPref, {
            foreignKey: 'userId',
            sourceKey: 'userId'
          });
        }
      }
    },
    {
      //optional functions added here
      hooks: {
        //hash the password after it has been validated for entry
        afterValidate: function(user) {
          user.password = bcrypt.hashSync(user.password, 8);
        }
      }
    }
  );

  return User;
};
