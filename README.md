## Mirador with support for displaying annotations on videos

### Project
- https://github.com/SCENE-CE/mirador-video

### Demo
- https://preprod-scene.tetras-libre.fr/

We will soon submit a PR to the official Mirador repository to add video support for annotations.
We already support React 17 and MUI5. We provide also a new plugin to display and edit annotations on videos : 
https://github.com/SCENE-CE/mirador-annotation-editor

## For Mirador Users

Our fork of Mirador is available as a package on npm.
To use it change your existing Mirador dependency to `mirador-video` in your `package.json` file.

Before
```json
"mirador": "^3.0.0"
```

After
```json
"mirador": "npm:mirador-video@^1.0.0"
```

Then run `npm install` to refresh your package.


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
