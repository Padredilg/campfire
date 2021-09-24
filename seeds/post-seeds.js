const { Post } = require('../models');

const postdata = [
  {
    title: 'Bootstrap is so OP',
    content: 'With bootstrap I can like literally build entirely pretty pages so quickly!! Does anyone even use a framework other than Bootstrap ever?',
    user_id: 2
  },
  {
    title: 'Insomnia is the best REST API Client',
    content: 'Its just so much better than Postman... Postman got nothing on Insomnia. If Insomnia isnt the best, I dont know what is!',
    user_id: 1
  },
  {
    title: 'Do you use Scratch?',
    content: 'Every coding opportunity on indeed for newcomers to the coding world is to teach kids scracth and I feel like other than teaching kids scratch isnt really that useful',
    user_id: 2
  },
  {
    title: 'HOLY SHIRTTTTT',
    content: 'I GOT A JOB AT GOOGLEEEEEEE',
    user_id: 1
  },
  {
    title: 'Incoming Social Media will explode the market!',
    content: "If you haven't heard of \"Campfire\" yet, you are missing out! Its literally the best social media for coding students!! Its just so amazing everything that you can do over there!",
    user_id: 2
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    content: 'd.edu/consequat.png',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: '.org/non/ligula/pellentesque.js',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    content: '/consequat/nulla.html',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    content: 'ian.com/dui/vel/nisl/duis/ac/nibh.aspx',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    content: 'ation.com/ligula/sit.jpg',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'm.cn/lectus/vestibulum.json',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    content: 'olutions.com/nam/ultrices/libero/non/mattis/pulvinar.json',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    content: 'am.com/ac/neque/duis/bibendum/morbi/non.xml',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    content: 'om/natoque/penatibus/et.html',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    content: 'g/lorem.jpg',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    content: 'ialle.it/mattis/egestas.jsp',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'm/turpis/eget.jpg',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    content: 'ale.com/quis.json',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    content: '/diam/neque/vestibulum/eget/vulputate/ut/ultrices.png',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    content: 'm/at/nibh/in.png',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
