# oam-dronedeploy
OAM export application for the DroneDeploy marketplace.

Development requirements assume Node and Yarn installed on your system.
To install the project's dependencies and development dependencies change to the project's root directory and run

````shell
$ yarn install
````

The application requires several environment variables. For development these can be placed in a `.env.dev` file.  For production use a `.env` file.

A Facebook App Id.

```
FACEBOOK_APP_ID=yourAppId
```

A Google Client Id

```
GOOGLE_CLIENT_ID=yourClientId
```

The OAM Catalog API endpoint

```
CATALOG_API_URL=apiUrl
```

You can then run

````shell
$ yarn watch
````
And any changes you make in the src files will be compiled on the fly into the /static files that the application uses. CSS and environment variable changes require a restart.

For a production build

```shell
$ yarn build 
```

The application can be tested in DroneDeploy by following the steps outlined [here](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/)

