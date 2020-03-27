//Dependencies
const express = require('express');
const partials = require('express-partials');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const methodOverride = require("method-override")

// import routers
const router = require('./router');

// create express server
const app = express();

// Static file service
app.use(express.static('public'));

////질문
// app.use(methodOverride("_method"))

// express server setting with app.set() method
app.set('views', 'views');
app.set('view engine', 'ejs');

// user partials with ejs
app.use(partials());
// ejs can rendering HTML file
app.engine('html', require('ejs').renderFile);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// use router
app.use('/', router);

// node.js의 native Promise 사용 (mongoose의 mPromise가 deprecated)
mongoose.Promise = global.Promise;

// connect to mongodb server
mongoose
  .connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.log(e));

app.listen(8080, function() {
  console.log('express server heard on 8080');
  console.log("let's go to http://localhost:8080");
});
