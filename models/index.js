// require models
const User = require('./User');
const Post = require('./Post');
const Comment = require("./Comment");
const Like = require("./Like");
const Friendship = require('./Friendship');

// USER-POST ASSOCIATIONS
User.hasMany(Post, {
  foreignKey: 'user_id'
});
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// USER-COMMENT ASSOCIATIONS
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// POST-COMMENT ASSOCIATIONS
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

//USER-LIKE-POST ASSOCIATIONS
User.hasMany(Like, {
  foreignKey: 'user_id'
});
Post.hasMany(Like, {
  foreignKey: 'post_id'
});
User.belongsToMany(Post, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'user_id'
});
Post.belongsToMany(User, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'post_id'
});


User.hasMany(Friendship, {
  foreignKey: 'requesting_user_id'
});
Friendship.belongsTo(User, {
  foreignKey: 'requesting_user_id'
});

User.hasMany(Friendship, {
  foreignKey: 'requested_user_id'
});
Friendship.belongsTo(User, {
  foreignKey: 'requested_user_id'
});


module.exports = {User, Post, Like, Comment, Friendship};

//Channels
//channel