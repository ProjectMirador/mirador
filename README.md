
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/IIIF/mirador?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Stories in Ready](https://badge.waffle.io/iiif/mirador.svg?label=ready&title=Ready)](http://waffle.io/iiif/mirador)

Mirador
=======
Mirador is a multi-repository, configurable, extensible, and easy-to-integrate viewer and annotation creation and comparison environment for IIIF resources, ranging from deep-zooming artwork, to complex manuscript objects. It provides a tiling windowed environment for comparing multiple image-based resources, synchronised structural and visual navigation of content using openSeadragon, Open Annotation compliant annotation creation and viewing on deep-zoomable canvases, metadata display, bookreading, and bookmarking.
###[See a Demo](http://projectmirador.org/demo/#aba693db-5073-4bcc-a855-9925fa3168d4)


### Getting Started with Local Development
Mirador uses [node.js](http://nodejs.org/) and a build system to assemble, test, and manage the development resources. If you have never used these tools before, you may need to install them.

 1. Install Node, if you haven't already (available at the link above)  
 2. Install the Grunt command line runner (if you haven't already); on the command line, run `npm install -g grunt-cli`  
 3. Clone the mirador repository (if you haven't already done so above)
 4. On the command line, go into the mirador folder
 5. Install all dependencies with `npm install` and `bower install`. Run `grunt`

A good practice is to clone the project into a directory that is being served by a running http server such as apache or nginx. However, if you would like to test and develop without using an external server, you may run `grunt server`.

Either visit the root folder of the project on your local server, or, if you are using `grunt server`, see the example working at `localhost:8000`.

To integrate the component into your project, include the `mirador.min.js` and `mirador-combined.css` from the build folder into your webpage or application asset pipeline, and call the Mirador constructor function with any appropriate configuration. For the moment, Mirador also uses local images to supply repository logos. These must be present in the same directory as the ultimate index.html (under `images/`). It also depends on the icon font [FontAwesome](http://fortawesome.github.io/Font-Awesome/), and expects it in a fonts directory at the same level as `index.html`.

You may also wish to obtain the source code from the [latest release](https://github.com/IIIF/mirador/releases/latest) as a downloadable artefact. The necessary files will be **in the build folder**.

#### For Example
```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <link rel="stylesheet" type="text/css" href="build/mirador/css/mirador-combined.css">
  <title>Mirador Viewer</title>
  <style type="text/css">
    body { padding: 0; margin: 0; overflow: hidden; font-size: 70%; }
    // Here we give the parent definite dimensions, and position fixed, letting it fill the whole browser viewport.
    #viewer { background: #333 url(images/debut_dark.png) left top repeat; width: 100%; height: 100%; position: fixed; }
  </style>
</head>
<body>
  // An element to contain the viewer instance.
  <div id="viewer"></div>

  <script src="build/mirador/mirador.js"></script>
  <script type="text/javascript">
    $(function() {
      Mirador({
        "id": "viewer", // The CSS ID selector for the containing element.
        "layout": "1x1", // The number and arrangement of windows ("row"x"column")?
        "data": [
        // This array holds the manifest URIs for the IIIF resources you want Mirador to make available to the user.
        // Each manifest object must have a manifest URI pointing to a valid IIIF manifest, and may also
        // provide a location to be displayed in the listing of available manifests.
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json", "location": "Stanford University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48309543", "location": "Harvard University"},
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Stanford/ege1/manifest.json", "location": "Stanford University"},
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/manifest.json ", "location": "Stanford University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont23", "location": "Yale University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093", "location": "Harvard University"},
          { "manifestUri": "http://dams.llgc.org.uk/iiif/4574752/manifest.json", "location": "National Library of Wales"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/via:olvwork576793", "location": "Harvard University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont43", "location": "Yale University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BeineckeMS10", "location": "Yale University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BodleianMSBodley113", "location": "Yale University"},
          { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json", "location":'BnF' },
          { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF'},
          { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/sl-0002/manifest.json", "location": 'e-codices'},
          { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/bge-cl0015/manifest.json", "location": 'e-codices'}
        ],
        // This array allows the user to specify which of the included manifests should appear
        // in the workspace, and what the configuration of the window (zoom level, open panels, etc.)
        // ought to be. To begin with, we will leave it blank.
        "windowObjects": []
      });
    });
  </script>
</body>
</html>
```

A Mirador instance will fill its container (not stretch it to a certain size). Therefore, the parent must have a definite height and width, and either `relative`, `fixed` or `absolute` position to work correctly (as seen above).

There can be as many instances of Mirador running on one page as desired. Simply name them differently and point them to different elements on the page.

For more information, see the [wiki](https://github.com/IIIF/mirador/wiki), submit an [issue](https://github.com/mirador/mirador/issues), or ask on [gitter](https://gitter.im/IIIF/mirador).

### Project Diagnostics
[![Build Status](https://travis-ci.org/IIIF/mirador.svg?branch=release2.1)](https://travis-ci.org/IIIF/mirador?branch=release2.1) [![Coverage Status](https://coveralls.io/repos/github/IIIF/mirador/badge.svg?branch=release2.1&upToDate=true)](https://coveralls.io/github/IIIF/mirador?branch=release2.1&upToDate=true)
