var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var browserify = require('browserify-middleware');
var db = require('./db');

var app = express();
module.exports = app;

app.use(history());
app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on localhost:" + port);
