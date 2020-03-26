//Dependencies
const express = require('express');
const partials = require('express-partials');
// const mongoose = require("mongoose")
// const methodOverride = require("method-override")

// create express server
const app = express();

// import routers
const router = require('./router');

////질문
// app.use(methodOverride("_method"))

// express server setting with app.set() method
app.set('views', 'views');
app.set('view engine', 'ejs');

// user partials with ejs
app.use(partials());

// Static file service
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// use router
app.use('/', router);

// node.js의 native Promise 사용 (mongoose의 mPromise가 deprecated)
// mongoose.Promise = global.Promise

// Connect to MongoDb server
// mongoose
//   .connect("mongodb://localhost:27017/test", {
//     userNewUrlparser: true,
//     userUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully Connected")
//   })
//   .catch(e => console.log(e))

app.listen(8080, function() {
  console.log('express server heard on 8080');
  console.log("let's go to http://localhost:8080");
});
