const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });

// Use Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

  
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    http.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});