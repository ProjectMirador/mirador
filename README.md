⚠️ This project is for Mirador 3, the latest version of Mirador. For Mirador 2, please see [ProjectMirador/mirador2](https://github.com/projectmirador/mirador2) or legacy documentation on the [Mirador 2 wiki](https://github.com/ProjectMirador/mirador-2-wiki/wiki). Please note that the community's focus is on Mirador 3, and are unlikely to accept pull requests or provide support for Mirador 2.
# Mirador
![Node.js CI](https://github.com/ProjectMirador/mirador/workflows/Node.js%20CI/badge.svg) [![codecov](https://codecov.io/gh/ProjectMirador/mirador/branch/master/graph/badge.svg)](https://codecov.io/gh/ProjectMirador/mirador) 

## For Mirador Users
You can quickly use and configure Mirador by remixing the [mirador-start](https://mirador-start.glitch.me/) Glitch.

We recommend installing Mirador using a JavaScript package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```sh
$ npm install mirador 

# or

$ yarn add mirador
```

If you are interested in integrating Mirador with plugins into your project, we recommend using webpack or parcel to integrate the es version of the packages. Examples are here:

[https://github.com/ProjectMirador/mirador-integration](https://github.com/ProjectMirador/mirador-integration)

## Adding translations to Mirador
For help with adding a translation, see [src/locales/README.md](src/locales/README.md)

## Running Mirador locally for development

Mirador local development requires [nodejs](https://nodejs.org/en/download/) to be installed.

1. Run `npm install` to install the dependencies.

### Starting the project

```sh
$ npm start
```

Then navigate to [http://127.0.0.1:4444/](http://127.0.0.1:4444/)

### Instantiating Mirador

```javascript
var miradorInstance = Mirador.viewer({
  id: 'mirador' // id selector where Mirador should be instantiated
});

> miradorInstance
{ actions, store }
```

### Example Action

Add a window:
```javascript
store.dispatch(actions.addWindow());
```

To focus a window run:

```javascript
store.dispatch(actions.focusWindow('window-1'))
```

### Check current state

```javascript
store.getState()
```

## Running the tests

```sh
$ npm test # For headless CI=true npm test
```

or to continually watch the source files

```sh
$ npm run test:watch
```

## Linting the project

```sh
$ npm run lint
```

## Debugging

### Local instance

The following browser extensions are useful for debugging a local development instance of Mirador:

 - [React DevTools](https://github.com/facebook/react-devtools)
 - [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)

### Test suite

To debug the test suite, run:

```sh
$ npm run test:debug
```

then spin up a [nodejs inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients) and set some breakpoints. See [here](https://www.digitalocean.com/community/tutorials/how-to-debug-node-js-with-the-built-in-debugger-and-chrome-devtools#step-3-%E2%80%94-debugging-node-js-with-chrome-devtools) for a guide to debugging with Chrome DevTools.
