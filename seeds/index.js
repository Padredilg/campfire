const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedLoves = require('./love-seeds');
const seedFriendships = require('./friendship-seeds');
const seedChannels = require('./channel-seeds');
const seedUserChannels = require('./userchannel-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  await seedUsers();
  console.log('--------------');

  await seedChannels();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedUserChannels();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedLoves();
  console.log('--------------');

  await seedFriendships();
  console.log('--------------');


  process.exit(0);
};

seedAll();
