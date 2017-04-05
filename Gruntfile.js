module.exports = function(grunt) {

  // ----------
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-git-describe');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-githooks');

  // ----------
  var distribution = 'build/mirador/mirador.js',
  minified = 'build/mirador/mirador.min.js',
  releaseRoot = '../site-build/built-mirador/',

  // libraries/plugins
  vendors = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    'node_modules/jquery-ui-dist/jquery-ui.min.js',
    'node_modules/bootstrap/js/modal.js',
    'node_modules/bootstrap/js/transition.js',
    'node_modules/bootbox/bootbox.js',
    'node_modules/jquery.scrollto/jquery.scrollTo.min.js',
    'js/lib/jquery.qtip.min.js',
    'node_modules/javascript-state-machine/state-machine.min.js',
    'node_modules/tinymce/tinymce.min.js',
    'node_modules/handlebars/dist/handlebars.js',
    'node_modules/openseadragon/build/openseadragon/openseadragon.js',
    'node_modules/d3/d3.min.js',
    'node_modules/jquery-plugin/dist/ba-tiny-pubsub.js',
    'node_modules/urijs/src/URI.min.js',
    'node_modules/mousetrap/mousetrap.min.js',
    'js/lib/isfahan.js',
    'node_modules/paper/dist/paper-core.min.js',
    'node_modules/spectrum-colorpicker/spectrum.js',
    'node_modules/i18next/i18next.min.js',
    'node_modules/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js',
    'node_modules/i18next-xhr-backend/i18nextXHRBackend.min.js',
    'bower_components/simplePagination.js/jquery.simplePagination.js',
    'js/lib/modernizr.custom.js',
    'js/lib/sanitize-html.min.js'
  ],

  // source files
  sources = [
    'js/src/mirador.js',
    'js/src/utils/handlebars.js',
    'js/src/*.js',
    'js/src/viewer/*.js',
    'js/src/manifests/*.js',
    'js/src/annotations/*.js',
    'js/src/workspaces/*.js',
    'js/src/widgets/*.js',
    'js/src/utils/*.js'
  ];

  // ----------
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build'],
      release: {
        src: [releaseRoot],
        options: {
          force: true
        }
      }
    },

    concat: {
      js: {
        options: {
          banner: '//! <%= pkg.name %> <%= pkg.version %>\n' + '//! Built on <%= grunt.template.today("yyyy-mm-dd") %>\n',
          process: true
        },
        src:  [ "<banner>" ].concat(vendors, sources),
        dest: distribution
      },
      css: {
        src: [
          'css/bootstrap.modals.css',
          'css/normalize.css',
          'node_modules/font-awesome/css/font-awesome.min.css',
          'css/jquery-ui.min.css',
          'css/jquery.qtip.min.css',
          'node_modules/spectrum-colorpicker/spectrum.css',
          'css/mirador.css',
          'css/material-icons.css',
          'bower_components/simplePagination.js/simplePagination.css'
        ],
        dest: 'build/mirador/css/mirador-combined.css'
      }
    },

    less: {
      compile: {
        files: {
          'css/mirador.css': 'css/mirador.less/main.less'
        }
      }
    },

    cssmin: {
      minify: {
        src: 'build/mirador/css/mirador-combined.css',
        dest: 'build/mirador/css/mirador-combined.min.css'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some',
        mangle: false,
        sourceMap: true
      },
      mirador: {
        src: [vendors, sources],
        dest: minified
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          src: 'css/images/**',
          dest: 'build/mirador/'
        }, {
          expand: true,
          cwd: 'node_modules/tinymce',
          src: 'themes/**',
          dest: 'build/mirador'
        }, {
          expand: true,
          cwd: 'node_modules/tinymce',
          src: 'skins/**',
          dest: 'build/mirador'
        }, {
          expand: true,
          cwd: 'node_modules/tinymce',
          src: 'plugins/**',
          dest: 'build/mirador'
        }, {
          expand: true,
          src: 'images/**',
          dest: 'build/mirador'
        }, {
          expand: true,
          cwd: 'node_modules/font-awesome',
          src: 'fonts/*',
          dest: 'build/mirador'
        }, {
          expand: true,
          cwd: 'node_modules/material-design-icons/iconfont',
          src: 'MaterialIcons*',
          dest: 'build/mirador/fonts'
        }, {
          src: 'js/lib/parse.min.js',
          dest: 'build/mirador/parse.min.js'
        }, {
          src: 'js/lib/ZeroClipboard.swf',
          dest: 'build/mirador/ZeroClipboard.swf'
        }, {
          expand: true,
          src: 'locales/**',
          dest: 'build/mirador'
        }]
      }
    },

    compress: {
      zip: {
        options: {
          archive: 'build/mirador.zip'
        },
        files: [
          { expand: true, cwd: 'build/', src: ['mirador/**'] }
        ]
      },
      tar: {
        options: {
          archive: 'build/mirador.tar'
        },
        files: [
          { expand: true, cwd: 'build/', src: [ 'mirador/**' ] }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    watch: {
      all: {
        options: {
          livereload: {
            // Here we watch the files the sass task will compile to
            // These files are sent to the live reload server after sass compiles to them
            options: { livereload: true },
            files: ['build/**/*']
          }
        },
        files: [
          'Gruntfile.js',
          'js/src/*.js',
          'js/src/*/*.js',
          'locales/*/*.json',
          'images/*',
          'css/*.css',
          'css/mirador.less/**/*.less',
          'index.html'
        ],
        tasks: 'dev_build'
      }
    },

    jshint: {
      options: {
        browser: true,
        eqeqeq: false,
        loopfunc: false,
        indent: false,
        jshintrc: '.jshintrc',
        globals: {
          Mirador: true
        }
      },
      beforeconcat: sources
    },

    'git-describe': {
      build: {
        options: {
          prop: 'gitInfo'
        }
      }
    },

    coveralls: {
      options: {
        src: 'reports/coverage/PhantomJS*/lcov.info',
        force: 'true'
      },
      ci: {
        src: 'reports/coverage/PhantomJS*/lcov.info'
      }
    }
  });

  // ----------
  // Copy:release task.
  // Copies the contents of the build folder into the release folder.
  grunt.registerTask('copy:release', function() {
    grunt.file.recurse('build', function(abspath, rootdir, subdir, filename) {
      var dest = releaseRoot +
        (subdir ? subdir + '/' : '/') +
        filename;

      grunt.file.copy(abspath, dest);
    });
  });

  // ----------
  // Build task.
  // Cleans out the build folder and builds the code and images into it, checking lint.
  grunt.registerTask('build', [ 'clean:build', 'git-describe', 'jshint', 'less', 'concat:css', 'uglify', 'cssmin', 'copy']);

  // ----------
  // Dev Build task.
  // Build, but skip the time-consuming and obscurantist minification and uglification.
  grunt.registerTask('dev_build', [ 'clean:build', 'git-describe', 'jshint', 'less', 'concat', 'copy']);

  // ----------
  // Package task.
  // Builds and creates the .zip and .tar files.
  grunt.registerTask('package', ['build', 'compress']);

  // ----------
  // Publish task.
  // Cleans the built files out of the release folder and copies newly built ones over.
  grunt.registerTask('publish', ['package', 'clean:release', 'copy:release']);

  // ----------
  // Default task.
  // Does a normal build.
  grunt.registerTask('default', ['build']);

  // ----------
  // Connect task.
  // Runs server at specified port
  grunt.registerTask('serve', ['dev_build', 'connect:server', 'watch']);

  // ----------
  // Runs this on travis.
  grunt.registerTask('ci', [
                     'jshint'
  ]);
};
