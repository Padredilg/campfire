const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class UserChannel extends Model {}

UserChannel.init(
  {
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    channel_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Channel',
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