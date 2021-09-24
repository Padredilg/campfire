const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  static uplike(body, models) {
    return models.Like.findOne({
        where: {
            user_id: body.user_id,
            post_id: body.post_id
        }
    }).then(foundLike => {
        if (foundLike) {
            // If the Like was found, destroy it - "unlike"
            return models.Like.destroy({
                where: {
                    user_id: body.user_id,
                    post_id: body.post_id
                }
            });
        } else {
            // If the like was not found, create a new like
            return models.Like.create({
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
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                    "vote_count"
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
    picture: {
      type: DataTypes.BLOB,
      allowNull: true,
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