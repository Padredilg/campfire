const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    likes: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;