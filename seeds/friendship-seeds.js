const {Friendship} = require('../models');

const friendshipData = [
  {
    requested_user_id: 1,
    requesting_user_id: 2
  },
  {
    requested_user_id: 1,
    requesting_user_id: 3
  },
  {
    requested_user_id: 2,
    requesting_user_id: 5
  },
  {
    requested_user_id: 7,
    requesting_user_id: 10
  },
  {
    requested_user_id: 8,
    requesting_user_id: 1
  },
  {
    requested_user_id: 9,
    requesting_user_id: 5
  },
  {
    requested_user_id: 6,
    requesting_user_id: 8
  }
];

const seedFriendships = () => Friendship.bulkCreate(friendshipData);

module.exports = seedFriendships;