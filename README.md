## Mirador with support for displaying annotations on videos

### Project
https://dh.l.u-tokyo.ac.jp/activity/iiif/video-annotation

### Demo
- https://dzkimgs.l.u-tokyo.ac.jp/videos/m3/cat_video.html
- https://dzkimgs.l.u-tokyo.ac.jp/videos/m3/video.html

### Manifest Sample
- https://dzkimgs.l.u-tokyo.ac.jp/videos/cat2020/manifest.json
- https://dzkimgs.l.u-tokyo.ac.jp/videos/iiif_in_japan_2017/manifest.json

### Prebuilt
https://dzkimgs.l.u-tokyo.ac.jp/videos/m3/mirador.min.js

### License
This project is dual-licensed under the Apache License 2.0 and the MIT license. See [LICENSE](LICENSE) for details.

---
*NOTE: This README reflects the latest version of Mirador, Mirador 3. For previous versions, please reference that release's README directly. Latest 2.x release: [v.2.7.0](https://github.com/ProjectMirador/mirador/tree/v2.7.0)*
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
Useful browser extensions for debugging/development purposes
 - [React DevTools](https://github.com/facebook/react-devtools)
 - [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)
