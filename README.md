# Deploying a Node.js app on to Bluemix

This guide will help you build a useful and fully functional To-Do web app from scratch. You will start by building an app that runs locally and then learn to deploy it to Bluemix. As you progress through the guide, you will add a Cloudant database and the Watson Text To Speech service to the To-Do app

See the finish app here: [Bluemix-Guide-NodeJS](https://bluemix-guide-nodejs.mybluemix.net)



To follow along this guide you’ll need a [Bluemix account](https://console.ng.bluemix.net/registration/) and have [Node.js and npm](https://nodejs.org/en/download/) and [git](https://git-scm.com/downloads) installed.

Let’s make sure you have node installed. Enter the following into your command line:

```
   $ node -v
```

Let’s check that you have git installed too:

```
   $ git --version
```


(--)


1 Clone the sample app

First up, let’s clone the sample app:
$ git clone https://github.com/Twanawebtech/Bluemix-Guide-Node
$ cd Bluemix-Guide-Node            .            .            .
$ cd STEP1-NODE-STARTER            .            .            .

 ----------------------------------------------------------------------------------
2 Run the app locally

In order to run the app we first have to install the dependencies listed in the package.json file
$ npm install            .

Run the app
$ node server.js         .

You should now see your app by viewing this URL - http://localhost:8080

 ----------------------------------------------------------------------------------
3 Preparing our app for deployment

In order to deploy to Bluemix you have to setup a manifest.yml file and package.json file. We’ve already added these files to our app for you.

package.json
allows Bluemix to identify your package dependencies with npm install when you push an app to Bluemix.

manifest.yml
gives Bluemix some basic information about your app, such as the name, how much memory to allocate and how many instances to create.

In order to deploy we’ll just have to make a few small changes to the manifest file.

Take a look at your manifest.yml file (located in the root directory) and you should see the following:

applications:               .
- path: .                   .
  memory: 256M              .
  instances: 1              .
  name: bluemix-guide-part-01
  host: bluemix-guide-part-01
  disk_quota: 1024M         .

Change both the name and host to a single unique name of your choice. Note that this name will be used in your public url, ie. http://bluemix-guide-part-01.mybluemix.net/


 ----------------------------------------------------------------------------------
4 Deploying our app

You will need to install the Cloud Foundry CLI which enables us to talk to Bluemix from within the command line.
Note: You may have to restart your terminal after installing.

Make sure you’re in the correct directory:
$ cd STEP1-NODE-STARTER                               .

Login into Bluemix:
$ cf login                                                        .

Choose your API endpoint:
US - $ https://api.ng.bluemix.net                  .
UK - $ https://api.eu-gb.bluemix.net            .
Sydney - $ api.au-syd.bluemix.net                    .



Select an Org and a Space to deploy to:
  Select an org (or press enter to skip)       .
 1. username@email.com                         .
$ Org> 1                                       .
$ Targeted org username@email.com                            .

Think of Orgs and Spaces as ways to organize your apps

Push your node app to Bluemix
$ cf push <app name>                                                       .
Remember: this is the name you entered in your manifest.yml file

If there is an error in the deployment process you can use the command $ cf logs < Your-App-Name > --recent to troubleshoot.

OK                                            .
requested state: started                      .
instance: 1/1                                 .
usage: 256M x 1 instances                     .
Urls: bluemix-guide-app-demo-01.mybluemix.net .
Last uploaded: Mon Apr 4 16:10:17 UTC 2016    .
Stack: cflinuxfs2              .              .
Buildpack: SDK for Node.js(™) (node.js-0.12.13, buildpack-v3.2-20160315-1257)                 .
State     since              cpu     memory       disk        details
Running   2016-04-04 05:11:26 PM  0.0%  58M of 256M    79.3M of 1G


Your application is now deployed! Go to http://<Your-App-Name>.mybluemix.net/ to see your app live on Bluemix.

Now that you know how to deploy a Node.js app, let’s add a Cloudant Database to our app so we can save our To-Do tasks.


# Adding a Cloudant Database to your app

With our Cloudant database we will add CRUD functionality to Create, Read, Update and Delete data to our To-Do App.

If you haven’t done the Deploying a Node app to Bluemix Guide, follow these steps before starting:
Clone the sample app:
$ git clone https://github.com/Twanawebtech/Bluemix-Guide-Node
Create an empty application on Bluemix - Required
You need to create an empty application on Bluemix to allow us to later on push the To-Do app to Bluemix. Quickest way to create an application on Bluemix is using the Bluemix user interface.

Open Bluemix in your browser and login with your Bluemix email and password.
Once you login successfully, go the Dashboard and click on the “Create App” button, then select the “Web” option and then for the runtime options select the “SDK for Node.js” and finally give your app a unique name then hit the create button.
(Keep a note of your application “Name” and “Host” as you be needing this in next step)

Whether or not you’ve deployed the app, you’ll have to update the manifest.yml file inside of the STEP-2-DATABASE
$ cd STEP2-DATABASE

Change the Name and Host in the manifest.yml file file with the Name and Host that you gave to your node application.

2.1 Adding the Cloudant Database
First thing we have to do is provision a database to Bluemix:
$ cf create-service cloudantNoSQLDB Shared todo-couch-db
*the database name must be “todo-couch-db” for the app to work since the To-do app code is expecting a database with that name.
Now let’s bind the database to our app:
$ cf bind-service <Your-Application-Name> todo-couch-db
After binding the database, we have to restage our app:
$ cf restage <Your-Application-Name>


2.2 Modify the code to connect to the database

Comment this code:
 “require("./lib/cli").guidePartOne()” - The guidePartOne() function is starting the server with loading the index web page without any connectivity to any database.

Uncomment this code:
“require("./lib/cli").main()”  - The main() function starts the server and establishes a connection with the Cloudant database.

Your code should look like this







2.3 Run the app locally and store To-do’s to Cloudant

To make sure your app is connecting to the correct Cloudant database, we need to specify the databases’ unique credentials in the code.
Get your credentials:
$ cf env <Your-Application-Name>

Copy and paste the Database Label, Username, Password and URL into lib/server.js line 52-55. This is what it should look like.


You are ready to run your app locally! We will use the same commands as we did in module 1. Here there are for your reference -
Install the package and dependencies listed in the package.json file:
$ npm install

Run the app:
$ node server.js

If everything goes right you will see the following on the CLI:
To view your app, open this link in your browser: http://localhost:8080

Let’s check if it’s working! Visit http://localhost:8080/ in your browser and view your app


2.4 Deploy your app to Bluemix
To push our app to Bluemix we can to make one smart modification to our To-Do app source code, earlier we hard coded the cloudant database credentials to the code, well now since our app will be living on Bluemix, we can take advantage of using VCAP services to not hardcode database credentials.

Change the code to use VCAP services
Comment out the code in which we hard code the database credentials and uncomment the VCAP service function like you see in below screenshot.
What is VCAP services? VCAP services are the environment variables for you application and services. In the To-do app we created the Cloudant database instance and Bluemix created the environment variable VCAP_SERVICE in our application runtime to store such information. This allows us to get the the database username and password without the need for hard coding the database credentials.
Double Check the manifest file
Open your manifest.yml file and make sure the Name and Host is matching with your application Name and Host on Bluemix.
Push your app to Bluemix
Login to Bluemix if you are not already logged in using the command line CLI:
$ cf login
(Enter your Bluemix Email and Password)

Push your changes to Bluemix:
$ cf push
Done! - See Your App On Bluemix
To see your To-do app running on Bluemix go to http://<Your-App-Name>.mybluemix.net/

Additional info: There is a .cfignore file that you should know about, this file used for listing the file patterns that should NOT be uploaded to Bluemix. This is to speeds up the deployment process. See the Cloud Foundry doc Prepare to Deploy an Application for more information.

View Data On Cloudant
To access Cloudant database dashboard, open the the Bluemix dashboard, open your application on Bluemix and then click on the Cloudant service, that will take you to another window and you should see a Launch button on the top right side, that will take you to your Cloudant database window where you can see and manage your data.




(--)



# Adding a Watson service to your app

Here we are going to look at how to make an API to call to a Watson service on Bluemix.
We are going to use a Watson Text To Speech service to convert the text to speech, the converted audio can download or just played back on the browser.

Once you understand the process of making an API call, you then should be able to use the same skills to use other Watson services.

####If you haven’t done the Deploying a Node app to Bluemix Guide, follow these steps before starting:
1. Clone the sample app:
  ```
    $ git clone https://github.com/Twanawebtech/Bluemix-Guide-Node
    $ cd _START
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



## License

  This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

## Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[service_url]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/text-to-speech.html
[cloud_foundry]: https://github.com/cloudfoundry/cli
[sign_up]: https://apps.admin.ibmcloud.com/manage/trial/bluemix.html?cm_mmc=WatsonDeveloperCloud-_-LandingSiteGetStarted-_-x-_-CreateAnAccountOnBluemixCLI

