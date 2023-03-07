# TravelingSalesmenDemonstrator

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

**The preperatory steps specific to each system will be listed in the specific system deployment manuals**

#### Perparation
In order to deploy the Traveling Salsemen Demonstrator, you first need to decide on which IP Adress the backend server needs to run.
After you have made that desicion, open the following File: `TravelingSalsemenDemonstrator/src/main/resources/application.properties`
In here you need to change the propertie `server.address` to your desired hosting adress. This is set to `localhost` by default.
Simmilarly you can decide on an open port to access your Spring Boot Server. 
This is done by editing the property `server.port` wich is set to `8080` by default.

Simmilarly you need to set the same adress as the frontend proxy. This will tell the frontend, where to find the Rest endpoints.

Herefor navigate to `TravelingSalsemenDemonstrator/frontend/package.json`.
In here, below the scripts-property, you will find the proxy property. 
This needs to be set to `http.//The_IP_adress_you_have_chosen_for_the_server:The_Port_for_the_server` it is set to `http://localhost:8080` by default. 

#### Windows
On a windows System, open your `Comand Line (CMD)` and navigate to your application root directory `TravelingSalsemenDemonstrator`

In here you need to execute the following command `.\mvnw spring-boot:run -Pprod`
This will run the server in the production environment. 

#### Linux 
On a linux distribution you need to take an additional preperatory step. For local hosting, i.e. running the backend server on `localhost` you need to delete the property `proxy` in the 
`TravelingSalsemenDemonstrator/frontend/package.json` file.
Afterwards, first run the batch-script `backend_server_start.sh` and afterwards, in a second terminal window run `frontend_start.sh`.

After running `frontend_start.sh` the frontend will automatically open a brwoser. In case this dosn't work, open your browser and enter `localhost:3000` into your browser bar.