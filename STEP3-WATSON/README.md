# Adding a Watson service to your app

Here we are going to look at how to make an API to call to a Watson service on Bluemix.
We are going to use a Watson Text To Speech service to convert the text to speech, the converted audio can download or just played back on the browser.

Once you understand the process of making an API call, you then should be able to use the same skills to use other Watson services.

####If you haven’t done the Deploying a Node app to Bluemix Guide, follow these steps before starting:
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


##Getting Started with adding Watson Text To Speech!

1. Modify the index.html
   Uncomment the code from line **12** to **46** by removing the opening and closing comments tags
   This code is adding a simple text area to some text and a two buttons to download converted audio.

2. Connect to Bluemix in the command line tool.
  ```
  $ cf login <your bluemix email and password>
  ```
3. Create a Watson Text To Speech Service
   ```
   $ cf create-service text_to_speech standard text-to-speech-service
   ```
4. Now let’s bind the watson to our app to better organise our services and this will display the service under your application when viewing on Bluemix dashboard (Note: you can use the same service on multiple applications)
   ```
   $ cf bind-service <Your-Application-Name> text-to-speech-service
   $ cf restage <Your-Application-Name>
   ```
5. Modify the code to use the Text To Speech service - Open the server.js file and uncomment the below that is from line 11 to 32.
  ```
    /*
        var watson = require('watson-developer-cloud');
        var textToSpeech = watson.text_to_speech({
            version: 'v1',
            username: '<service-username>',
            password: '<service-password>'
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
  ```

 **Note:** there is a demo.js under the `views/js/watson/JS` in which handles the events for when clicking on Download or the speak button

6. Push it live to Bluemix!
  ```
  $ cf push
  ```


## Running locally
  To run the app locally is super simple at this stage.

1. Copy the username and password from your `text-to-speech-service` service in Bluemix to `server.js`, you can see the credentials using:

    ```
    $ cf env <application-name>
    ```
    Example output:
    ```
    System-Provided:
    {
    "VCAP_SERVICES": {
      "text_to_speech": [{
          "credentials": {
            "url": "<url>",
            "password": "<password>",
            "username": "<username>"
          },
        "label": "text_to_speech",
        "name": "text-to-speech-service",
        "plan": "free"
     }]
    }
    }
    ```
    You need to copy `username` and `password`.

2. Go to the project folder in a terminal and run:
    ```
    npm install
    ```
3. Start the application
    ```
    node server.js
    ```
4. Go to [http://localhost:8080](http://localhost:8080)


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

