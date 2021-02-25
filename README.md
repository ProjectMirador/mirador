_NOTE: This README reflects the latest version of Mirador, Mirador 3. For previous versions, please reference that release's README directly. Latest 2.x release: [v.2.7.0](https://github.com/ProjectMirador/mirador/tree/v2.7.0)_

# **Mirador**

![Node.js CI](https://github.com/ProjectMirador/mirador/workflows/Node.js%20CI/badge.svg) [![codecov](https://codecov.io/gh/ProjectMirador/mirador/branch/master/graph/badge.svg)](https://codecov.io/gh/ProjectMirador/mirador)

## Contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Basic example](#basic-example)
- [React example](#react-example)
- [Plugins](#plugins)
- [Developing and contributing](#developing-and-contributing)

# Installation

We recommend installing Mirador using a JavaScript package manager like [**npm**](https://www.npmjs.com/) or [**yarn**](https://yarnpkg.com/).

```sh
$ npm install mirador

# or

$ yarn add mirador
```

*If you are interested in integrating Mirador with plugins into your project, we recommend using webpack or parcel to integrate the es version of the packages. Examples are [**here**](https://github.com/ProjectMirador/mirador-integration).*

# Basic usage

## Importing

First of all the Mirador itself should be imported using js import:

```js
import Mirador from 'mirador/dist/es/src';
```

or

```html
<script src="${MIRADOR_PATH}/mirador/dist/mirador.min.js"></script>
```

_where the ```MRADOR_PATH``` is where your mirador is located_

## Creating a Mirador instance

To start using Mirador you should create it first.

```js
const miradorInstance = Mirador.viewer({
  /* here goes your Mirador config */
});
```

_You can see an example of the config [**here**](https://github.com/ProjectMirador/mirador/blob/master/src/config/settings.js)_

Creating a Mirador instance you'll get an object:

```js
const { config, plugins, store } = miradorInstance;

// config - this is a config passed on creation
// plugins - this object helds all plugins you've used on creation
// store - helds all mirador-related store metods
//         such as dispatch(), getState(), ..., etc.
```

Using the ```subscribe()``` method you can easily get all state changes in-code:

```js
miradorInstance.store.subscribe(() => {
  // for instance you can get new state here:
  const state = miradorInstance.store.getState();
  ...
});
```

For now mirador states are reachable from your js code whether it's a [simple in-html-js](#basic-example) or a [react app](#react-example).

## Actions dispatch

All info connected with Mirador-redux (action types, action params etc etc) is presented [**here**](https://github.com/ProjectMirador/mirador/tree/master/src/state).

You can dispatch them using the ```dispatch()``` function in the store object that is returned after instance creation. Here is an example of setting a Mirador instance to fullscreen:

```js
const {
  store: { dispatch },
} = miradorInstance;

dispatch({
  isFullscreenEnabled: true,
  type: 'mirador/SET_WORKSPACE_FULLSCREEN',
});
```

# Basic example

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <!-- Where the Mirador is rendered -->
    <div id="viewer"></div>

    <!-- Mirador package import -->
    <script src="../node_modules/mirador/dist/mirador.min.js"></script>

    <script type="text/javascript">
      // Creating a Mirador instance
      const myMiradorInstance = Mirador.viewer({
        // an `id` of a container where the Mirador should be rendered
        id: 'viewer',
        // a manifest url
        windows: [
          {
            loadedManifest:
              'https://iiif.ub.uni-leipzig.de/0000031264/manifest.json',
          },
        ],
      });
    </script>
  </body>
</html>
```

# React example

```jsx
import React, { useEffect, useState } from 'react';
import Mirador from 'mirador/dist/es/src/index';

function App() {
  const [miradorInstance, setMiradorInstance] = useState(null);

  // on create
  useEffect(() => {
    const _miradorInstance = Mirador.viewer({
      id: 'viewer',
      windows: [
        {
          loadedManifest:
            'https://iiif.ub.uni-leipzig.de/0000031264/manifest.json',
        },
      ],
    });
    setMiradorInstance(_miradorInstance);
  }, []);

  useEffect(() => {
    miradorInstance?.store?.subscribe(() => {
      /* ... */
    });
  }, [miradorInstance]);
  return <div id='viewer'></div>;
}
```

# Plugins

Mirador supports various types of plugins. To use a one you should import it in your project and include it during creating a Mirador instance.

```js
...

import { plugin } from 'mirador-plugin';

...

const myMiradorInstance = Mirador.viewer({/* config */}, [...plugin]);
```

**WARNING: some plugins may cause react errors using React 17.x.x**

# Developing and contributing

## Starting a local developing instance

Mirador local development requires [nodejs](https://nodejs.org/en/download/) to be installed.

### Installing dependencies

```sh
$ npm install
```

**WARNING: may require `--force` flag**

### Starting the project

```sh
$ npm start
```

Then navigate to [http://127.0.0.1:4444/](http://127.0.0.1:4444/)

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

## Adding translations to Mirador

For help with adding a translation, see [src/locales/README.md](src/locales/README.md)

## Debugging

Useful browser extensions for debugging/development purposes

- [React DevTools](https://github.com/facebook/react-devtools)
- [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)
