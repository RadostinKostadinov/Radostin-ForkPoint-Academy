const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const routes = {
  index: require('./routes/wireframes/index'),
  category: require('./routes/wireframes/categoriesMenu'),
  productsList: require('./routes/wireframes/productsListPage'),
  product: require('./routes/wireframes/productDetailsPage'),
  designPLP: require('./routes/design/designProductsListPage'),
  designPDP: require('./routes/design/designProductDetailsPage'),
};

mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => { console.log('Connected to Database'); });

const app = express();

// All environments
app.set('port', 1666);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.cookieParser('61d333a8-6325-4506-96e7-a180035cc26f'));
app.use(session({
  secret: 'forkpoint training',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(express.errorHandler());

// App routes
app.get('/wireframes/', routes.index);
app.get('/wireframes/categories/:categoryID', routes.category);
app.get('/wireframes/products/:categoryID', routes.productsList);
app.get('/wireframes/product/:productID', routes.product);
app.get('/design/products', routes.designPLP);
app.get('/design/product/:productID', routes.designPDP);
// Run server
http.createServer(app).listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${app.get('port')} \nGo to: http://localhost:${app.get('port')}/`);
});
