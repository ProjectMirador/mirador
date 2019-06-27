# Contributing a Mirador translation

Mirador is built with internationalization and translation support. It uses a translation file and [react-i18next](https://react.i18next.com/) to provide translations in user interface elements.

## Getting started
To contribute a new language to Mirador, you will need to convert the strings contained in [en/translation.json](en/translation.json) to the target language.

So we would want to create a directory for the target language using the iso language code that copies from the `en/translation.json` file. e.g. `fr/translation.json`.

```sh
$ mkdir src/locales/fr && cp src/locales/en/translation.json src/locales/fr/translation.json
```

For example, this subset of the English file:

```javascript
// src/locales/en/translation.json
{
  "translation": {
    "aboutThisItem": "About this item",
    "addedFromUrl": "(Added from URL)",
    "addManifestUrl": "Resource location",
    "addManifestUrlHelp": "The URL of a IIIF resource",
    "addResource": "Add resource",
    "annotationCanvasLabel_1/1": "Item: [{{label}}]",
...
```

Would look like this in French.

```javascript
// src/locales/fr/translation.json
{
  "translation": {
    "aboutThisItem": "A propos de cet item",
    "addedFromUrl": "(Ajouté depuis une URL)",
    "addManifestUrl": "Emplacement de la ressource",
    "addManifestUrlHelp": "L'URL de la ressource IIIF",
    "addResource": "Ajouter une ressource",
    "annotationCanvasLabel_1/1": "Item: [{{label}}]",
...
```

Strings contained in double curly braces `{{}}` should not be changed.

The [`i18n.js`](../i18n.js) file should also be updated for the new language.
