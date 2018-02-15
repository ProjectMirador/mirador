## Running the module
This module is intended to be a console-only version of the a Mirador-like viewer, with tests and the ability to manipulate the state tree through actions in the console.

To run the module, first make sure you are in this directory (`minimal_redux_poc`), then:

1. Run `npm install` to install the dependencies.
1. Run the `npm run build:umd` task. This will produce an "isomorphic" webpack bundle of the module that can run in the console or browser. The bundle will be called `index.umd.js` and is placed in this same directory.
1. Open a nodejs console (type `node`) in this directory.
1. Import variable names from the module, for example, `let { store, actions } = require('./index.umd')`.
1. The exported module currently has most of its functionality under the "store" property, so you may prefer to include it with `let state = require('./index.umd').store`.

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
