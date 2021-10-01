const { UserChannel } = require('../models');

const channeldata = [
  {
    user_id: 1,
    channel_id: 1,
  },
  {
    user_id: 1,
    channel_id: 2,
  },
  {
    user_id: 1,
    channel_id: 3,
  },  
  {
    user_id: 2,
    channel_id: 1,
  },
  {
    user_id: 2,
    channel_id: 2,
  },
  {
    user_id: 2,
    channel_id: 3,
  },
  {
    user_id: 3,
    channel_id: 1,
  },
  {
    user_id: 3,
    channel_id: 2,
  },
  {
    user_id: 3,
    channel_id: 3,
  },
  {
    user_id: 4,
    channel_id: 1,
  },
  {
    user_id: 4,
    channel_id: 2,
  },
  {
    user_id: 4,
    channel_id: 3,
  },
];

const seedUserChannels = () => UserChannel.bulkCreate(channeldata);

module.exports = seedUserChannels;
