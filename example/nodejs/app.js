
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , install = require('./routes/install')
  , calendar = require('./routes/calendar')
  , http = require('http')
  , path = require('path')
  , i18n = require('i18n')
  , expressValidator = require('express-validator');

var app = express();

i18n.configure({
    locales:['zh-cn','en','en-us'],
    extension: '.json',
    register: global,
    updateFiles: false
});
i18n.setLocale('en-us');
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(expressValidator);
  app.use(express.methodOverride());
  app.use(i18n.init);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'static')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
//app.get('/install', install.index);
app.get('/calendar', calendar.index);
app.get('/calendar/add', calendar.editview);
app.get('/calendar/edit/:id', calendar.editview);

app.post('/calendar/query', calendar.query);
app.post('/calendar/add', calendar.add);
app.post('/calendar/update', calendar.update);
app.post('/calendar/delete', calendar.delete);
app.post('/calendar/save/:id?', calendar.save);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
