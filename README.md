[![Build Status](https://travis-ci.org/IIIF/mirador.svg)](https://travis-ci.org/IIIF/mirador) [![Coverage Status](https://img.shields.io/coveralls/IIIF/m2.svg)](https://coveralls.io/r/IIIF/m2)  

[![Sauce Test Status](https://saucelabs.com/browser-matrix/IIIF.svg)](https://saucelabs.com/u/IIIF)  

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/IIIF/mirador?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Mirador
=======
Mirador is a multi-repository, configurable, extensible, and easy-to-integrate viewer amd annotation creation and comparison environment for IIIF resources, ranging from deep-zooming artwork, to complex manuscript objects. It provides a tiling windowed environment for comparing multiple image-based resources, synchronised structural and visual navigation of content using openSeadragon, Open Annotation compliant annotation creation and viewing on deep-zoomable canvases, metadata display, bookreading, and bookmarking.

To begin working with Mirador, run:

`git clone https://github.com/IIIF/m2.git`

Install all dependencies with `npm install` and `bower install`. Run `grunt`.

A good practice is to clone the project into a directory that is being served by a running http server such as apache or nginx. However, if you would like to test and develop without using an external server, you may run `grunt server`.

Either visit the root folder of the project at localhost, or, if you are using `grunt server`, see the example working at localhost:8000.

To integrate the component into your project, include the `mirador.min.js` and `mirador-combined.css` from the build folder into your webpage or application asset pipeline, and call the Mirador constructor function with any appropriate configuration.

### For Example
```




 

