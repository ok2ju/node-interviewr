var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('./lib/mongoose');
var cors = require('cors');

var User = require('./models/user');
var Company = require('./models/company');
var Vacancy = require('./models/vacancy');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || config.get('port'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

// Routes

var companies = require('./routes/companies');
var users = require('./routes/users');

app.use('/api', companies);
app.use('/api', users);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
