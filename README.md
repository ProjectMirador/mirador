

*NOTE: This README reflects the in development version of Mirador 3. For previous versions, please reference that release's README directly. Latest 2.x release: [v.2.7.0](https://github.com/ProjectMirador/mirador/tree/v2.7.0)*

## Running Mirador locally

1. Run `npm install` to install the dependencies.

## Starting the project

```sh
$ npm start
```

Then navigate to [http://127.0.0.1:4444/__tests__/integration/mirador/](http://127.0.0.1:4444/__tests__/integration/mirador/)

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
Useful browser extensions for debugging/development purposes
 - [React DevTools](https://github.com/facebook/react-devtools)
 - [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)
