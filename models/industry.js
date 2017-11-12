module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Industry',
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
};
