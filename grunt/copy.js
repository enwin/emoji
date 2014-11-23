/*global module:false*/
module.exports = {
  config: {
    files: [
      {
      '<%= build %>/': [ 'datas/*' ]
      },
      {
        expand: true,
        cwd: 'scripts/',
        src: [ 'config.js', '**/config.js' ],
        dest: '<%= build %>js/'
      }
    ]
  },
  files: {
    files: [
      {
      '<%= build %>/': [ 'media/**/*', 'manifest.webapp' ]
      }
    ]
  },
  js: {
    files: [{
        expand: true,
        cwd: 'scripts/',
        src: [ '**/*.js' ],
        dest: '<%= build %>js/'
    }]
  },
  media: {
    files: {
      '<%= build %>/': [ 'media/**/*']
    }
  },
  img: {
    files: {
      '<%= build %>': [ 'media/img/**/*', 'media/dyn/**/*']
    }
  },
  fonts: {
    files: {
      '<%= build %>/': [ 'media/fonts/**/*']
    }
  }
};
