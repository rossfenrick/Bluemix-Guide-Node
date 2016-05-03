    var main = require("./lib/main");
    var _ = require("underscore");
    var express = require("express");
    var app = express();
    var port = process.env.VCAP_APP_PORT || 8080;
    var options;
    var shortOptions;
    var envOptions = {};


    //app.use(express.static(__dirname + '/views'));

    //view engine setup
    //app.set('view engine', 'ejs');





    /*


    var watson = require('watson-developer-cloud');
    var fs     = require('fs');

    var personality_insights = watson.personality_insights({
        username: '655a8add-dabd-4d38-a4c7-861218cafde1',
        password: 'edxzQZI6jFQ3',
        version: 'v2'
    });


    app.get('/', function(req, res, next) {
        personality_insights.profile({
                text: 'For more than twenty years past I have been paying special attention to the question of Health. While in England, I had to make my own arrangements for food and drink, and I can say, therefore, that my experience is quite reliable. I have arrived at certain definite conclusions from that experience, and I now set them down for the benefit of my readers. As the familiar saying goes, ‘Prevention is better than cure.’ It is far easier and safer to prevent illness by the observance of the laws of health than to set about curing the illness which has been brought on by our own ignorance and carelessness. Hence it is the duty of all thoughtful men to understand aright the laws of health, and the object of the following pages is to give an account of these laws. We shall also consider the best methods of cure for some of the most common diseases.' },
            function (err, response) {
                if (err)
                    console.log('error:', err);
                else
                {
                    res.render('index', { WatsonOutput: JSON.stringify(response, null, 2) });
                    console.log(JSON.stringify(response, null, 2));

                }
            });

    });



          */





    // Guide Part 1 - loading the To-Do without Cloudant.

   /*
    app.listen(port, function() {
        console.log("To view your app, open this link in your browser: http://localhost:" + port);
    });

     */






    // Guide Part 2 - Using Cloudant

        if (process.env.PORT != null) {
            envOptions.port = process.env.PORT;
        }
        options = _.defaults(envOptions, {
            db: 'cloudant'
        });
        return main.start(options);
