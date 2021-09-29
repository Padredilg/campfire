const { Post } = require('../models');

const postdata = [
  {
    content: 'With bootstrap I can like literally build entirely pretty pages so quickly!! Does anyone even use a framework other than Bootstrap ever?',
    user_id: 2,
    channel_id: 1
  },
  {
    content: 'Its just so much better than Postman... Postman got nothing on Insomnia. If Insomnia isnt the best, I dont know what is!',
    user_id: 1,
    channel_id: 3
  },
  {
    content: 'Every coding opportunity on indeed for newcomers to the coding world is to teach kids scracth and I feel like other than teaching kids scratch isnt really that useful',
    user_id: 2,
    channel_id: 3
  },
  {
    content: 'I GOT A JOB AT GOOGLEEEEEEE',
    user_id: 1,
    channel_id: 2
  },
  {
    content: "If you haven't heard of \"Campfire\" yet, you are missing out! Its literally the best social media for coding students!! Its just so amazing everything that you can do over there!",
    user_id: 2,
    channel_id: 2
  },
  {
    content: 'Amazon unwraps privacy features as it tries to roll deeper into your home',
    user_id: 4,
    channel_id: 2
  },
  {
    content: '2022 Jeep Grand Cherokee debuts with optional plug-in hybrid power',
    user_id: 1,
    channel_id: 1
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
