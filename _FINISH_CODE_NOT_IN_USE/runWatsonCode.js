//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

var exam, output = {}, alc, demo_text, keywordsUsed, tempOutput;
demo_text = 'This is a sample todo message that we are sending to Watson Alchemy Keywords';
keywordsUsed =
    [
      {
        "text": "todo"
      },
      {
        "text": "NodeJS"
      },
      {
        "text": "things"
      }
    ];
exports.tempOutput = JSON.stringify(keywordsUsed,null,4);
    exports.keywords = function(demo_text, res) {
      alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response)
      {
        output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
        response = output['keywords'].response;
        console.log('===================================================');
        console.log('Keywords sent to Watson Alchemy: ' + demo_text);
        console.log('Watson Output: ' + response);
        console.log('===================================================');
        //return response;
      });
      //return 'Sample value';
    };


    // This function will output AlchemyAPI result
    var promise;

    exports.promise = new Promise(function(resolve, reject)
    {

      resolve();
    });
