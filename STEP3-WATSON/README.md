# Adding a Watson service to your app

Here we are going to look at how to make an API to call to a Watson service on Bluemix. We are going to use a Watson AlchemyAPI Text Extraction service to extract the keywords from the ToDo's that we type.


#####If you haven’t done the Deploying a Node app to Bluemix Guide, follow these steps before starting:
1. Clone the sample app:
  ```
    $ git clone https://github.com/Twanawebtech/Bluemix-Guide-Node
    $ cd STEP3-WATSON
  ```

2. Create an empty application on Bluemix - Required

You need to create an empty application on Bluemix to allow us to later on push the To-Do app to Bluemix.
Quickest way to create an application on Bluemix is using the Bluemix user interface.

Open Bluemix in your browser and login with your Bluemix email and password.
Once you login successfully, go the Dashboard and click on the “Create App” button, then select the “Web” option and then for the runtime options select the “SDK for Node.js” and finally give your app a unique name then hit the create button.

(Keep a note of your application `“Name”` and `“Host”` as you be needing this in next step)

Whether or not you’ve deployed the app, you’ll have to update the manifest.yml file with your application "Name" and "Host"

3.Change the `"Name"` and `"Host"` in the `manifest.yml` file with the Name and Host that you gave to your node application


##Getting Started With Watson (Alchemy Text Extraction)

1. Connect to Bluemix in the command line tool.
  ```
  $ cf login <your bluemix email and password>
  ```
  
2. Create a Watson Alchemny service to get your Alchemy Key
   ```
   $ cf create-service alchemy_api standard AlchemyAPI-service
   ```
   
3. Now let’s bind the watson to our app to better organise our services and this will display the service under your application when viewing on Bluemix dashboard (Note: you can use the same service on multiple applications)
   ```
   $ cf bind-service <Your-Application-Name> AlchemyAPI-service
   $ cf restage <Your-Application-Name>
   ```
   
4. Get the Alchemy API Key using this command:
```
$ cf env <Your-Application-Name>
```

5. Now with that in place, you are done from the Bluemix side, lets focus on the code. First you need to create a txt file with the Alchemy Key added inside. Use this command to create the txt file with your key.

    ```
    $ cd STEP3-WATSON  
    $ npm install  
    $ node alchemyapi.js <Your-Watson AlchemyAPI-Key>
    (Note, you already have the alchemyapi.js inside your folder directory. The alchemyapi.js is used for making any of the AlchemyAPI calls. You need to have that source file for when using any of the Watson AlchemyAPI services)
    ```


6. Modify the code to use the Watson Alchemy Text Extraction service

Open the runWatsonCode.js file and add the code sinps below:
**(Note: This code will be updated when NodeJS issue resolved)**
  ```
      //Create the AlchemyAPI object
      var AlchemyAPI = require('./alchemyapi');
      var alchemyapi = new AlchemyAPI();
    
      var output = {}, demo_text, keywordsUsed, tempOutput;
      demo_text = 'This is a sample todo message that we are sending to Watson Alchemy Keywords';
      keywordsUsed =[{
              "text": "todo"
            },{
              "text": "NodeJS"
            },{
              "text": "things"
            }];
      exports.tempOutput = JSON.stringify(keywordsUsed,null,4);
    
      exports.keywords = function(demo_text, res) {
        alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response){
            output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
            response = output['keywords'].response;
            console.log('===================================================');
            console.log('Keywords sent to Watson Alchemy: ' + demo_text);
            console.log('Watson Output: ' + response);
            console.log('===================================================');
        });
      };
  ```

 **Note:** The couch-db.js will be using the AlchemyAPI function on CRUD and return then result to the view. The Watson keyword Extraction results will be showing on Create and Update for when adding ToDo's.


6. Push it live to Bluemix!
    ```
    $ cf push
    ```

## Running locally
  To run the app locally is super simple at this stage.

1. Start the application
    ```
    $ node server.js
    ```
2. Go to [http://localhost:8080](http://localhost:8080)



## Troubleshooting

  Here are some useful commands you can use. You will learn more when working with the Bluemix CLI.

  ```sh
    $ cf logs < Your-App-Name > --recent
    (View Recent Deployment logs)
  ```

  ```sh
  $ cf login
  (Login to Bluemix)
  ```
  ```sh
    $ cf apps
    (View current apps on targeted org/space)
  ```
  ```sh
   $ cf services
   (View services on targeted org/space)
  ```
  ```sh
   $ cf push < Your-App-Name >
   (Push your app to Bluemix)
  ```
  ```sh
   $ cf delete < Your-App-Name >
   (Delete App from Bluemix)
  ```
  ```sh
   $ cf restage < Your-App-Name >
   (Restage your app, command in which you need to use when binding services)
  ```
  ```sh
  $ cf env < Your-App-Name >
  (Displays application environment details, if services binned to your app such as a database then you can see your Database details as well using this command)
  ```

  [Click here to see more commands](https://console.ng.bluemix.net/docs/cli/reference/bluemix_cli/index.html)
