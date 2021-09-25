const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  static uplove(body, models) {
    return models.Love.findOne({
        where: {
            user_id: body.user_id,
            post_id: body.post_id
        }
    }).then(foundLove => {
        if (foundLove) {
            // If the Love was found, destroy it - "unLove"
            return models.Love.destroy({
                where: {
                    user_id: body.user_id,
                    post_id: body.post_id
                }
            });
        } else {
            // If the Love was not found, create a new Love
            return models.Love.create({
                user_id: body.user_id,
                post_id: body.post_id
            });
        }
    }).then(() => {
        return Post.findOne({
            where: {
                id: body.post_id
            },
            attributes: [
                "id",
                "content",
                "title",
                "created_at",
                [
                    sequelize.literal('(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)'),
                    "love_count"
                ]
            ]
        });
    });
  }
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
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    // picture: {
    //   type: DataTypes.BLOB,
    //   allowNull: true,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
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