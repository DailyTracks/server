const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boards', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true,
      comment: "위도"
    },
    longitude: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: true,
      comment: "경도"
    }
  }, {
    sequelize,
    tableName: 'boards',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
