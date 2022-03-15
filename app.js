var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('express-session');


var app = express();

// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'navigationbar',
            helpers: {
              admin:false, 
              shoppingCartPage : false, 
              convertToDecimal : function(val) {return val.toFixed(2);},
              isSelected: function (val1, val2) {
                return val1 === val2 ? 'selected' : '';},
              isEqual: function(val1, val2, options) {
                  return (val1 === val2)? options.fn(this) : options.inverse(this);}
            }
          }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//set up session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))


// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./controllers/index');
const req = require('express/lib/request');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404View');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});

