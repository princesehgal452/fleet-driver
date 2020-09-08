#Notes
- This Boilerplate: https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template
- React Router: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
- Ajax in React using axios: https://daveceddia.com/ajax-requests-in-react/
- Understanding React Deployment: https://medium.com/@baphemot/understanding-react-deployment-5a717d4378fd
- React In-Depth: https://developmentarc.gitbooks.io/react-indepth/content/
- Notifications: https://github.com/minhtranite/react-notifications
- Geosuggest (Google Places API, Address autofill): https://github.com/ubilabs/react-geosuggest
- Datepicker: https://hacker0x01.github.io/react-datepicker/
- Timepicker: http://react-component.github.io/time-picker/
- Stripe front-end form: https://github.com/stripe/react-stripe-elements

## Features
- [React](https://facebook.github.io/react)
- [ES6](http://es6-features.org) (with [babel](https://babeljs.io))
- [SCSS](http://sass-lang.com) using ITCSS and [BEM](http://getbem.com/introduction/) methodology.
    - See this [sample](https://github.com/xfiveco/chisel-sample/tree/master/src/styles)
- [Hot Module Replacement](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.xh6v0ht7j) ([React Hot Loader 3](https://github.com/gaearon/react-hot-loader/issues/243))
- Webpack 2
    - [Webpack-dev-server](https://webpack.js.org/how-to/develop/#webpack-dev-server)
    - Webpack Babel loader configuration
    - Webpack SCSS configuration
    - [Webpack configuration for HMR](https://webpack.js.org/how-to/hot-module-reload)
    - Webpack production configuration
         - Split out css files (two threads, JS and CSS) using [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin)
         - [UglifyJsPlugin with options](https://github.com/webpack/webpack/blob/v1.13.3/lib/optimize/UglifyJsPlugin.js)
         - Use include in the loader instead of the exclude. [More info](http://stackoverflow.com/questions/37823764/how-include-and-exclude-works-in-webpack-loader)
         - More perfomance tips: [here](https://medium.com/@khanght/optimize-webpack-production-build-ec594242b222#.bj3eyg65p)
    - Webpack stats (bundle optimization helper)
        - Generate stats.json file with profiler. Use (this tool)[http://webpack.github.io/analyse/] to analyze it.
        - [webpack visualizer](https://chrisbateman.github.io/webpack-visualizer/)
<br />

<br /><br />
## Getting Started
### Install pre-requisites
- Node.js and NPM: [Download and install](https://nodejs.org/). *I have version 6.6.0 of Node and 3.10.6 of NPM on Windows PC*
- Git: [Download and install](https://git-scm.com/). *I have version 2.7.4 installed on Windows PC*

### Clone Repo
1. Get the url of your forked project.
2. Click on **"Clone or download"** and Copy to clipboard the url ending on .git.
3. Open your command line and go to your directoy
*You don't need to create a specific folder for the project, it will be created by git*
4. Clone your forked repo on your machine:
```

### Install yarn
We will use yarn as a client for NPM registry, because that will avoid some conflicts on dependencies between environments.
Download and Install yarn (I have version 0.16.1 installed):
```
$ npm i -g yarn
```


### Install Project dependencies
As we have yarn, instead of using npm i to install all our dependencies in our node_modules folder, we will use just yarn.
*Note: you need to be sure your are inside the project folder because yarn will look for package.json file.*

```
$ cd fleetops-app
$ yarn
```


### Open the project with your Development IDE
I use VS Code https://code.visualstudio.com
Open the project using this command:
```
$ code .
```

### Start development server with Hot Reloading
```
$ npm run start
```
