var port, Q, Server, appEnv, cfEnv, couchDB, express, getCloudant, http, ports, todoDB, tx, DatabaseURL, DatabaseName;

http = require("http");
Q = require("q");
ports = require("ports");
express = require("express");
cfenv = require("cfenv");
appEnv = cfenv.getAppEnv();
if (appEnv.isLocal)
  require('dotenv').load();
couchDB = require("./couch-db");
watson = require("watson-developer-cloud");
tx = require("./tx");
todoDB = null;
port = process.env.VCAP_APP_PORT || 8080;
DatabaseName = "todo-couch-db";
//localDB = "http://127.0.0.1:5984";
var Promise = require('bluebird');
var async = require("async");

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

  //< This is only needed for when running the app locally, if app is running then it will take the URL database details and when pushed to Bluemix then it will take VCAP below>
  //DatabaseURL = "< Add your Cloudant database URL >";
  DatabaseURL = process.env.CLOUDANT_URL;



  // ===== START ===== VCAP - For when pushing the code to Bluemix - Note here we are not hard coding any database credentials. This is best practice for when pushing apps to Bluemix
     url = appEnv.getServiceURL(DatabaseName,
     {
     pathname: "database",
     auth: ["username", "password"]
     });
   // ===== FINISH =====




  url = url || DatabaseURL;
  //url = url || localDB;
  length = url.length - 1;
  endsInSlash = url.indexOf('/', length);
  if (endsInSlash === -1) {
    url = url + '/';
  }
  url = url + 'todo-couch-db';
  return url;
};

// Set up AlchemyAPI handler using WDC module
var alchemyLanguage = watson.alchemy_language({
  api_key: process.env.ALCHEMY_API_KEY
<<<<<<< HEAD
  //api_key: 'Add your AlchemyAPI key here if urnning locally'

=======
>>>>>>> origin/master
});


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


    app.use(express["static"]("public"));
    app.use(express.json());

    app.use(function(req, res, next) {
      req.tx = tx.tx(req, res, todoDB);
      return next();
    });


    app.get("/api/todos", (function(_this) {
      return function(req, res){
        return req.tx.search();
      };
    })(this));


    app.post("/api/todos", (function(_this) {
      return function(req, res)
      {
          //displaying AlchemyAPI
          //demo_text = req.body.title;
          //console.log(demo_text);
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

        //Watson AlchemyAPI
        //demo_text = req.body.title;
        //keywords(output, demo_text);

        return req.tx.update();
      };
    })(this));
    app["delete"]("/api/todos/:id", (function(_this) {
      return function(req, res) {
        return req.tx["delete"]();
      };
    })(this));


    app.get("/api/keywords", (function(_this) {
      return function(req, res){
        var params = {
          text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
        };

        alchemyLanguage.keywords(params, function (err, response) {
          var answer;
          if (err)
            answer = err;
          else
            answer = JSON.stringify(response.keywords, null, 2);
          res.send(answer);
        });
      };
    })(this));

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
