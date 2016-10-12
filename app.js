/**
 * Module dependencies.
 */

var express = require('express');
var sqlite3 = require('sqlite3');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jwt-simple');
var path = require('path');
var db = new sqlite3.Database('tracker.db');
var app = module.exports = express.createServer();


/**
 *
 */
db.serialize(function() {

  db.run('CREATE TABLE if not exists users ' +
         '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
         '"user_name" VARCHAR(32), ' +
         '"password" VARCHAR(32), ' +
         'UNIQUE(user_name))', function(error) {
           if(error !== null)
             console.log(error);
         });

  db.run('CREATE TABLE if not exists characters ' +
         '("key_id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
         '"v_code" VARCHAR(64), ' +
         '"user_name" VARCHAR(32), ' +
         '"character_name" VARCHAR(32), ' +
         'UNIQUE(key_id))', function(error) {
           if(error !== null)
             console.log(error);
         });
});

/**
 *
 */
app.configure(function() {

  module.exports.secret = 'super-secret1234';
  app.use(express.cookieParser());
  app.use(express.session({secret: 'something'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(express.static(__dirname + '/public'));
});

/**
 *
 */
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/**
 *
 */
app.configure('production', function(){
  app.use(express.errorHandler());
});


// /**
//  *
//  */
// app.post('/register', function(req, res) {

//   db.serialize(function() {
    
//     var responseData;

//     responseData = new Object();
//     responseData.success = false;
//     responseData.message = '';

//     if(!req.body.userName || !req.body.password) {
//       responseData.messae = 'A name and password are required';
//       res.send(responseData);
//       return;
//     }  // 

//     // TODO salt password

//     db.all('SELECT user_name FROM users WHERE ' +
//            'user_name=$userName;', {
//              $userName: req.body.userName
//            },
//            function(error, rows) {
//              if(!error) {
//                console.log('got rows ' + rows.length);
//                if(rows.length == 0) {
//                  responseData.success = true;
//                  db.run('INSERT into users(user_name, password) VALUES (?, ?);',
//                         req.body.userName, req.body.password,
//                         function(error) {
//                           console.log(error);
//                         });
//                }  // if
//                else
//                  responseData.message = 'User already exists';
//              }  // if
//              else
//                console.log(error);
//              res.send(responseData);
//            });
//   });
// });

// /**
//  *
//  */
// app.post('/login', function(req, res) {

//   var responseData;

//   responseData = new Object();
//   responseData.success = false;
//   responseData.message = '';

//   db.all('SELECT user_name, password FROM users WHERE ' +
//          'user_name=$userName AND password=$password', {
//            $userName: req.body.userName,
//            $password: req.body.password
//          }, function(error, rows) {
//            if(error !== null)
//              console.log(error);
//            else {
//              if(rows.length == 1) {
//                responseData.success = true;
//                responseData.token = 'JWT ' + jwt.encode(req.body.userName, module.exports.secret);
//              }
//              else
//                responseData.message = 'User name or password incorrect';

//            }

//            res.send(responseData);
//          });
// });

app.use('/api', require('./routes'));

/**
 *
 */
app.get('/*', function(req, res) {

  // hack to get around a bug in node
  var filepath = '/home/dragor/src/evesales/public/index.html';
  res.sendfile(path.basename(filepath), {root: path.dirname(filepath)}); 
});

/**
 *
 */
app.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
