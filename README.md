## Mirador with support for displaying annotations on videos

Forked from official  https://github.com/ProjectMirador/mirador#

### Demo
- https://tetras-iiif.github.io/mirador-video/

We will soon submit a PR to the official Mirador repository to add video support for annotations and other enhancement.
We already support React 18/19, MUI7 and are up-to-date to Mirador 4 (4.0.0 version). 

We provide also a new plugin to display and edit annotations on videos : https://github.com/TETRAS-IIIF/mirador-annotation-editor-video

We have also old version compatible with M3 and older version of React. Contact us to have more information.

## For Mirador Users

Our fork of Mirador is available as a package on npm.
To use it change your existing Mirador dependency to `mirador-video` in your `package.json` file.

Before
```json
"mirador": "^4.0.0"
```

After
```json
"mirador": "npm:mirador-video@^1.1.0"
```

Then run `npm install` to refresh your package.


## Running Mirador locally for development

Mirador local development requires [nodejs](https://nodejs.org/en/download/) to be installed. Use `nvm use` to set minimal supported version of NPM.

```sh
npm install 
```

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
We use Vitest to run our test suite.

```sh
$ npm test
```

You can see the helpful Vitest UI in your browser by running Vitest with the `--ui` flag. To pass the flag through to npm run the following:

```sh
$ npm test -- --ui
```

You can run Vitest without the additional linting and size checks in our `npm test` command. You can also test a single file:
```sh
$ npx vitest __tests__/integration/mirador/tests/sequence-switching.test.js --ui
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
