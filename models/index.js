// require models
const User = require('./User');
const Post = require('./Post');
const Friendship = require('./Friendship');

// associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
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

module.exports = {User, Post, Friendship};