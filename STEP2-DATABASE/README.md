# Adding a Watson to your app

With our Cloudant database we will add CRUD functionality to Create, Read, Update and Delete data to our To-Do App.

**If you haven’t done the Deploying a Node app to Bluemix Guide,** follow these steps before starting:
- Clone the sample app: $ git clone https://github.com/Twanawebtech/Bluemix-Guide-Node

- Create an empty application on Bluemix(Required!) you need to create an empty application on Bluemix to allow us to later on push the To-Do app to Bluemix. Quickest way to create an application on Bluemix is using the Bluemix user interface.

- Open Bluemix in your browser and login with your Bluemix email and password. Once you login successfully, go the Dashboard and click on the “Create App” button, then select the “Web” option and then for the runtime options select the “SDK for Node.js” and finally give your app a unique name then hit the create button.
(Keep a note of your application “Name” and “Host” as you be needing this in next step)

Whether or not you’ve deployed the app, you’ll have to update the manifest.yml
`
$ cd STEP2-DATABASE
`

Change the Name and Host in the manifest.yml file file with the Name and Host that you gave to your node application.

###1.0 Adding the Cloudant Database

First thing we have to do is provision a database to Bluemix
```
$ cf create-service cloudantNoSQLDB Shared todo-couch-db
```
The database name must be “todo-couch-db” for the app to work since the To-do app code is expecting a database with that name.

Now let’s bind the database to our app:
```
$ cf bind-service <Your-Application-Name> todo-couch-db
```

After binding the database, we have to restage our app:
```
$ cf restage <Your-Application-Name>
```




###2.0 Run the app locally and store To-do’s to Cloudant

To make sure your app is connecting to the correct Cloudant database, we need to specify the databases’ unique credentials in the code.
```
Get your credentials:
$ cf env <Your-Application-Name>
```

Copy and paste the your cloudant database URL into lib/main.js line 47. This is what it should look like.
```
  DatabaseURL = "< Add your Cloudant database URL >";
```

You are ready to run your app locally!
We will use the same commands as we did in part one.
Here there are for your reference -
Install the package and dependencies listed in the package.json file:

```
    $ npm install
```

Run the app:
```
    $ node server.js
```

If everything goes right you will see the following on the CLI:
To view your app, open this link in your browser: [http://localhost:8080](http://localhost:8080)

Let’s check if it’s working! Visit [http://localhost:8080](http://localhost:8080) in your browser and view your app


###3.0 Deploy your app to Bluemix
To push our app to Bluemix we can to make one smart modification to our To-Do app source code, earlier we hard coded the cloudant database credentials to the code, well now since our app will be living on Bluemix, we can take advantage of using VCAP services to not hardcode database credentials.

####3.1 VCAP services
For when pushing code to Bluemix you can remove the database URL if you wish. We are using VCAP services so we don't need to hard code database URL.
The VCAP code where we get database details looks like this:
```
   url = appEnv.getServiceURL(DatabaseName,
   {
     pathname: "database",
     auth: ["username", "password"]
   });


   url = url || DatabaseURL;

```


**What is VCAP services?**
VCAP services are the environment variables for you application and services.
In the To-do app we created the Cloudant database instance and Bluemix created the environment variable VCAP_SERVICE in our application runtime to store such information.  This allows us to get the the database username and password without the need for hard coding the database credentials.

####3.2 Double Check the manifest file
Open your manifest.yml file and make sure the Name and Host is matching with your application Name and Host on Bluemix.


####3.3 Push your app to Bluemix
Login to Bluemix if you are not already logged in using the command line CLI:
```
$ cf login
(Enter your Bluemix Email and Password)
```

Push your changes to Bluemix:
```
$ cf push
Done! - See Your App running Bluemix: http://<Your-App-Name>.mybluemix.net/
```

**Additional info:** There is a .cfignore file that you should know about, this file used for listing the file patterns that should NOT be uploaded to Bluemix.
This is to speeds up the deployment process. See the Cloud Foundry doc Prepare to Deploy an Application for more information.

####4.0 View Data On Cloudant
To access Cloudant database dashboard, open the the Bluemix dashboard, open your application on Bluemix and then click on the Cloudant service, that will take you to another window and you should see a Launch button on the top right side, that will take you to your Cloudant database window where you can see and manage your data.


** Cloudant Part completed, next let's add a Watson service to our To-Do app **

**Next: [Add Watson Service >>](https://github.com/Twanawebtech/Bluemix-Guide-Node/tree/master/STEP3-WATSON)**









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


