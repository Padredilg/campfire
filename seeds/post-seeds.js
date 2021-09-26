const { Post } = require('../models');

const postdata = [
  {
    content: 'With bootstrap I can like literally build entirely pretty pages so quickly!! Does anyone even use a framework other than Bootstrap ever?',
    user_id: 2
  },
  {
    content: 'Its just so much better than Postman... Postman got nothing on Insomnia. If Insomnia isnt the best, I dont know what is!',
    user_id: 1
  },
  {
    content: 'Every coding opportunity on indeed for newcomers to the coding world is to teach kids scracth and I feel like other than teaching kids scratch isnt really that useful',
    user_id: 2
  },
  {
    content: 'I GOT A JOB AT GOOGLEEEEEEE',
    user_id: 1
  },
  {
    content: "If you haven't heard of \"Campfire\" yet, you are missing out! Its literally the best social media for coding students!! Its just so amazing everything that you can do over there!",
    user_id: 2
  },
  {
    content: 'd.edu/consequat.png',
    user_id: 4
  },
  {
    content: '.org/non/ligula/pellentesque.js',
    user_id: 1
  },
  {
    content: '/consequat/nulla.html',
    user_id: 1
  },
  {
    content: 'ian.com/dui/vel/nisl/duis/ac/nibh.aspx',
    user_id: 9
  },
  {
    content: 'ation.com/ligula/sit.jpg',
    user_id: 5
  },
  {
    content: 'm.cn/lectus/vestibulum.json',
    user_id: 3
  },
  {
    content: 'olutions.com/nam/ultrices/libero/non/mattis/pulvinar.json',
    user_id: 10
  },
  {
    content: 'am.com/ac/neque/duis/bibendum/morbi/non.xml',
    user_id: 8
  },
  {
    content: 'om/natoque/penatibus/et.html',
    user_id: 3
  },
  {
    content: 'g/lorem.jpg',
    user_id: 3
  },
  {
    content: 'ialle.it/mattis/egestas.jsp',
    user_id: 7
  },
  {
    content: 'm/turpis/eget.jpg',
    user_id: 6
  },
  {
    content: 'ale.com/quis.json',
    user_id: 4
  },
  {
    content: '/diam/neque/vestibulum/eget/vulputate/ut/ultrices.png',
    user_id: 6
  },
  {
    content: 'm/at/nibh/in.png',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
