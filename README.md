## Mirador with support for displaying annotations on videos

### Demo
- TODO

We will soon submit a PR to the official Mirador repository to add video support for annotations.
We already support React 18 and MUI5 are up-to-date to Mirador 4 alpha 2. We provide also a new plugin to display and edit annotations on videos : 

https://github.com/ARVEST-APP/mirador-annotation-editor

## For Mirador Users

Our fork of Mirador is available as a package on npm.
To use it change your existing Mirador dependency to `mirador-video` in your `package.json` file.

Before
```json
"mirador": "^3.0.0"
```

After
```json
"mirador": "npm:arvest-mv@^1.0.8"
```

Then run `npm install` to refresh your package.


## Running Mirador locally for development

Mirador local development requires [nodejs](https://nodejs.org/en/download/) to be installed.

### Installation

```sh
npm install
```

### Starting the project

```sh
npm start
```

Then navigate to [http://127.0.0.1:$PORT/](http://127.0.0.1:$PORT/)

$PORT is the port number where the project is running. Check the output of the start command to see the port number.

### Instantiating Mirador

```javascript
var miradorInstance = Mirador.viewer({
  id: 'mirador' // id selector where Mirador should be instantiated
});

> miradorInstance
{ actions, store }
```
