    var main = require("./lib/main");
    var _ = require("underscore");
    var express = require("express");
    var app = express();
    var port = process.env.VCAP_APP_PORT || 8080;
    var options;
    var shortOptions;
    var envOptions = {};
    app.use(express.static(__dirname + '/views'));

    // Adding Text to Speech Service - For local development, Add your watson Speech to Text username and password. You can get your Watson username and password from Bluemix Dashboard or run the this command $cf env <Application-Name>
    /*
     // will be adding VACP here!
     var watson = require('watson-developer-cloud');
        var textToSpeech = watson.text_to_speech({
            version: 'v1',
            username: '6162d342-0d69-46e6-857e-aaf4e28deb1f',
            password: 'i7UiKe6e2Pb8'
        });

        app.get('/api/synthesize', function(req, res, next) {
            var transcript = textToSpeech.synthesize(req.query);
            transcript.on('response', function(response) {
                if (req.query.download) {
                    response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
                }
            });
            transcript.on('error', function(error) {
                next(error);
            });
            transcript.pipe(res);
        });
   */



    // Guide Part 1 - loading the To-Do without Cloudant.
    app.listen(port, function() {
        console.log("To view your app, open this link in your browser: http://localhost:" + port);
    });


    // Guide Part 2 - Using Cloudant
    /*
     if (process.env.PORT != null) {
            envOptions.port = process.env.PORT;
        }
        options = _.defaults(envOptions, {
            db: 'cloudant'
        });
        return main.start(options);
     */
