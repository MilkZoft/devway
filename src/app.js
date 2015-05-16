'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// config
var config = require('./lib/config');

// security
var security = require('./lib/helpers/security');

// logging
var logger = require('morgan');
app.use(logger('dev'));

// input
var input = require('./lib/helpers/input');
app.use(input);

// cookies/session
var cookieParser = require('cookie-parser');
var session = require('./lib/helpers/session');

app.use(cookieParser());
app.use(session);

// security token
app.use(function(req, res, next) {
  if (!res.session('securityToken')) {
    res.session('securityToken', security.sha1(new Date()));
  }

  next();
});

// layout
var exphbs = require('express-handlebars');
var hbsHelpers = require('./lib/helpers/handlebars');

// stylus
var stylus = require('stylus');
var nib = require('nib');

// Handlebars setup
app.engine(config().html.extension, exphbs({
  extname: config().html.extension,
  defaultLayout: config().html.layout,
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  helpers: hbsHelpers
}));

// compile less for styles on the fly
if (!config().views.stylusPrecompile) {
  app.use(
    stylus.middleware({
      src: __dirname + '/stylus',
      dest: __dirname + '/public/css',
      compile: function(str, path) {
        return stylus(str)
                .set('filename', path)
                .set('compress', config().views.minify)
                .use(nib());
      }
    })
  );
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config().html.extension);
app.use(express.static(path.join(__dirname, 'public')));

// Sending config to templates
app.use(function(req, res, next) {
  res.locals.config = config();
  next();
});

// Disabling x-powered-by
app.disable('x-powered-by');

// dispatch router
require('./router')(app);

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
