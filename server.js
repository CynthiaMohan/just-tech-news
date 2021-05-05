const express = require('express');
const routes = require('./controllers');
const sequilize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequilize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});