/*global module:false*/
var chouchenn = require( 'chouchenn' ),
    autoprefixer = require( 'autoprefixer-stylus' );

module.exports = function() {

  return {
    dev:{
      files: [{
        expand: true,
        cwd: 'styles',
        src: [ '**/*.styl', '!**/_*.styl', '!_*/**/*.*' ],
        dest: '<%= build %>/css',
        ext: '.css'
      }],
      options: {
        'use': [ chouchenn, function() { return autoprefixer({ browsers: [ 'last 2 versions' ] }); }  ],
        'import': [ 'chouchenn' ],
        'compress': false,
        'sourcemap': {
          'inline': true
        }
      }
    },
    release: {
      files: '<%= stylus.dev.files %>',
      options: {
        'use': [ chouchenn, function() { return autoprefixer({ browsers: [ 'last 2 versions' ] }); }  ],
        'import': [ 'chouchenn' ]
      }
    }
  };
};
