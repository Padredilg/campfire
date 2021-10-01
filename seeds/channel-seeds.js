const { Channel } = require('../models');

const channeldata = [
  {
      name: 'test server 1',
      user_id: 1,
  },
  {
    name: 'test server 2',
    user_id: 2,
  },
  {
    name: 'test server 3',
    user_id: 3,
  },
  {
    name: 'test server',
    user_id: 4,
  },
  {
    name: 'test server',
    user_id: 5,
  },
  {
    name: 'test server',
    user_id: 6
  } 
];

const seedChannels = () => Channel.bulkCreate(channeldata);

module.exports = seedChannels;
