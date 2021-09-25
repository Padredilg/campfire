const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class UserChannel extends Model {}

UserChannel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    channel_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'channel',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'userchannel'
  }
);

module.exports = UserChannel;