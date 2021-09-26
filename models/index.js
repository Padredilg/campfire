// require models
const User = require('./User');
const Post = require('./Post');
const Comment = require("./Comment");
const Love = require("./Love");
const Friendship = require('./Friendship');
const Channel = require('./Channel');
const UserChannel = require('./UserChannel');

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

//CHANNEL-USER ASSOCIATIONS
User.belongsToMany(Channel, {
  through: UserChannel
})

Channel.belongsToMany(User, {
  through: UserChannel
})

// CHANNEL-POST ASSOCIATIONS
Channel.hasMany(Post, {
  foreignKey: 'channel_id'
});
Post.belongsTo(Channel, {
  foreignKey: 'channel_id'
});

//USER-Love-POST ASSOCIATIONS
User.hasMany(Love, {
  foreignKey: 'user_id'
});
Post.hasMany(Love, {
  foreignKey: 'post_id'
});
User.belongsToMany(Post, {
  through: Love,
  as: 'loved_posts',
  foreignKey: 'user_id'
});
Post.belongsToMany(User, {
  through: Love,
  as: 'loved_posts',
  foreignKey: 'post_id'
});


User.hasMany(Friendship, {
  foreignKey: 'requesting_user_id'
});
Friendship.belongsTo(User, {
  as: 'requesting',
  foreignKey: 'requesting_user_id'
});

User.hasMany(Friendship, {
  foreignKey: 'requested_user_id'
});
Friendship.belongsTo(User, {
  as: 'requested',
  foreignKey: 'requested_user_id'
});


module.exports = {User, Post, Love, Comment, Friendship, Channel, UserChannel};

