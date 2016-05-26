var port, Q, Server, appEnv, cfEnv, couchDB, express, getCloudant, http, ports, todoDB, tx, DatabaseURL, DatabaseName, output = {};

http = require("http");
Q = require("q");
ports = require("ports");
express = require("express");
cfEnv = require("cfenv");
couchDB = require("./couch-db");
tx = require("./tx");
todoDB = null;
port = process.env.VCAP_APP_PORT || 8080;
DatabaseName = "todo-couch-db";
//localDB = "http://127.0.0.1:5984";

var async = require("async");


//Create the AlchemyAPI object
var AlchemyAPI = require('./config/alchemyapi');
var alchemyapi = new AlchemyAPI();



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

  //< This is only needed for when running the app locally, if app is running then it will take the URL database details and when pushed to Bluemix then it will take VCAP below>
  //DatabaseURL = "< Add your Cloudant database URL >";
  DatabaseURL = "https://b87439d6-6b4c-4453-9891-47c3981b1f74-bluemix:82c2907068ab6333c8399d2acf6ad1e1d926ff04ec5402d9d69535d2bd86e6d0@b87439d6-6b4c-4453-9891-47c3981b1f74-bluemix.cloudant.com";



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


    app.use(express["static"]("views"));
    app.use(express.json());
    
    
    var demo_text;


    

    exports.keywords = function (output, demo_text, res) {

      alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
        output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
        console.log('===================================================');
        console.log('Keywords sent to Watson Alchemy: ' + demo_text);
        console.log('Watson Output: ' + output['keywords'].response);
        response = output['keywords'].response;
        console.log('===================================================');

        /*
         display(function (test) {
            //console.log('Test Fun: ' + test);
         });
         */

        res = response;
        console.log('Res: ' + res);
        return response;

      });

      

    };


    /*

    var tempV;
    exports.tempV = tempV;



    var display = function (cb) {
      console.log('Response Inside display Function cb: ' + cd);


      return cb;
    };


    exports.display = display;

    */




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
          //exports.WatsonRespondOutput = keywords(output, demo_text);

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
        demo_text = req.body.title;
        keywords(output, demo_text);
        return req.tx.update();
      };
    })(this));
    app["delete"]("/api/todos/:id", (function(_this) {
      return function(req, res) {
        return req.tx["delete"]();
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