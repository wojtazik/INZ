# About project
This is the frontend part of engineering thesis created for a diploma at a Poznan University of Technology.
Thesis thema is "Simulation of a part of production process using PLC controller and web application".

Project is splitted into two parts. Here you can explore frontend part of project. You can also find backend part https://github.com/wojtazik/INZ-backend

## Used technologies (main):
 - React
 - Redux
 - Typescript
 - Redux middlewares (thunk)
 - Node.js
 - Express
 - Create-react-app
 - Socket.io

This project works with a process created in the PLC Siemens S1200. You can explore whole files in the project, but it won't work without PLC.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You have to install Node.js environment in min. 12.X version with Node Package Manager ( it is installed automatically when you install Node.js).
After install node.js you can check version of installed environment using command 
### `node -v`

You can also switch between node.js versions. Just type `nvm use [version]` into console. If you want to install other version, you can do it using command `nvm install [version]`


First, install dependencies using command:

### `yarn`
or better 
### `npm install`

It will takes a few moments. Later you can run application using scripts:

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
