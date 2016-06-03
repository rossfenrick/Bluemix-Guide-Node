### If you haven’t done the Deploying a Node app to Bluemix Guide, follow these steps before starting:
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

3. Change the `"Name"` and `"Host"` in the `manifest.yml` file with the Name and Host that you gave to your node application


 **[YOU ARE READY TO START THE WATSON PART, CLICK TO GO BACK...](https://github.com/Twanawebtech/Bluemix-Guide-Node/tree/master/STEP3-WATSON)**  
