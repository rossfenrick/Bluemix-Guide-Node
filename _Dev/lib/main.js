  var port, Q, Server, appEnv, cfEnv, couchDB, express, getCloudant, http, ports, todoDB, tx, DatabaseURL, DatabaseName;
  http = require("http");
  Q = require("q");
  ports = require("ports");
  express = require("express");
  cfEnv = require("cfenv");
  couchDB = require("./couch-db");
  tx = require("./tx");
  todoDB = null;
  port = process.env.VCAP_APP_PORT || 8080;
  DatabaseURL = "";
  DatabaseName = "todo-couch-db";
  localDB = "http://127.0.0.1:5984";



  appEnv = cfEnv.getAppEnv({
  
  });
  
  process.on("exit", function(status) {
    return log("process exiting with Error status  " + status);
  });
  
  exports.start = function(options) {
    var couchURL;
    if (options.db === "cloudant") {
      couchURL = getCloudant();
      return couchDB.init(couchURL).fail(function(err) {
  
        return logError(err);
      }).then(function(todoDB_) {
        var server;
        todoDB = todoDB_;
        server = new Server(options);
        return server.start();
      }).done();
    }
  };
  
  getCloudant = function() 
  {
    var endsInSlash, length, url;
  
    //For when running the app locally, using Cloudant on Bluemix for your Database, while app is running locally.
    /*
    var DatabaseLabel = "cloudantNoSQLDB";
    var DatabaseUsername = "c60761e4-b6bb-4a06-9f13-3f9559915806-bluemix";
    var DatabasePassword = "a717610cc8fee566dbf84f9c5b86758a79d995583477231c335dc44475c5ed6f";
    DatabaseURL = "https://c60761e4-b6bb-4a06-9f13-3f9559915806-bluemix:a717610cc8fee566dbf84f9c5b86758a79d995583477231c335dc44475c5ed6f@c60761e4-b6bb-4a06-9f13-3f9559915806-bluemix.cloudant.com";
  
    url = appEnv.getServiceURL(DatabaseName,
        {
          pathname: DatabaseLabel,
          auth: [DatabaseUsername, DatabasePassword]
        });
      */


    //For when pushing the code to Bluemix - Note here we are not hard coding any database credentials. This is best practice for when pushing apps to Bluemix
     url = appEnv.getServiceURL(DatabaseName,
     {
     pathname: "database",
     auth: ["username", "password"]
     });

    url = url || DatabaseURL;
    //url = url || localDB;
    length = url.length - 1;
    endsInSlash = url.indexOf('/', length);
    if (endsInSlash === -1) {
      url = url + '/';
    }
    url = url + 'bluemix-todo';
    return url;
  };
  
  
  Server = (function() 
  {
    function Server(options) {
      if (options == null) {
        options = {};
      }
      if (options.port == null) {
        options.port = appEnv.port;
      }
      if (options.verbose == null) {
        options.verbose = false;
      }
      this.port = options.port, this.verbose = options.verbose;
    }
  
    Server.prototype.start = function() {
      var app, deferred;
      deferred = Q.defer();
      app = express();

      // view engine setup
      //app.use(express.static(__dirname + '/views'));
      //app.set('view engine', 'ejs');


      app.use(express["static"]("views"));
      app.use(express.json());

      app.use(function(req, res, next) {
        req.tx = tx.tx(req, res, todoDB);
        return next();
      });
      app.get("/api/todos", (function(_this) {
        return function(req, res) {
          return req.tx.search();
        };
      })(this));
      app.post("/api/todos", (function(_this) {
        return function(req, res) {
          return req.tx.create();
        };
      })(this));
      app.get("/api/todos/:id", (function(_this) {
        return function(req, res) {
          return req.tx.read();
        };
      })(this));
      app.put("/api/todos/:id", (function(_this) {
        return function(req, res) {
          return req.tx.update();
        };
      })(this));
      app["delete"]("/api/todos/:id", (function(_this) {
        return function(req, res) {
          return req.tx["delete"]();
        };
      })(this));



      /*
      var watson = require('watson-developer-cloud');
      var fs     = require('fs');

      var personality_insights = watson.personality_insights({
        username: '655a8add-dabd-4d38-a4c7-861218cafde1',
        password: 'edxzQZI6jFQ3',
        version: 'v2'
      });




      app.get("/", function(req, res, next)
      {
          personality_insights.profile({
            text: 'For more than twenty years past I have been paying special attention to the question of Health. While in England, I had to make my own arrangements for food and drink, and I can say, therefore, that my experience is quite reliable. I have arrived at certain definite conclusions from that experience, and I now set them down for the benefit of my readers. As the familiar saying goes, ‘Prevention is better than cure.’ It is far easier and safer to prevent illness by the observance of the laws of health than to set about curing the illness which has been brought on by our own ignorance and carelessness. Hence it is the duty of all thoughtful men to understand aright the laws of health, and the object of the following pages is to give an account of these laws. We shall also consider the best methods of cure for some of the most common diseases.' },
              function (err, response) {
                if (err)
                  console.log('error:', err);
                else
                {
                  res.render('index', { WatsonOutput: JSON.stringify(response, null, 2) });
                  //console.log(JSON.stringify(response, null, 2));
                }
              });
      });

         */

      app.listen(port, appEnv.bind, (function(_this) {
        return function() {
  
          // print a message when the server starts listening
          console.log("To view your app, open this link in your browser: http://localhost:" + port);
          return deferred.resolve(_this);
        };
      })(this));
  
      return deferred.promise;
    };
  
    return Server;
  
  })();