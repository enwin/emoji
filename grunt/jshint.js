/* global module:false */
module.exports = {
  dev: {
    src: [
      'scripts/**/*.js',
      '!scripts/helpers/*.js',
      '!scripts/tools/*.js',
      '!scripts/vendors/*',
      '!scripts/assets/**/*',
      '!scripts/modernizr.js'
    ],
    options: {
      // use the jshint project configuration
      jshintrc: '.jshintrc',
      // dont fail the task if there's an error
      force: true
    }
  },
  release: {
    src: '<%= jshint.dev.src %>',
    options: {
      // use the jshint project configuration
      jshintrc: '.jshintrc',
      // fail the task if there's an error
      force: false
    }
  },
  gruntfile: {
    src: 'Gruntfile.js',
    options: {
      jshintrc: '.jshintrc'
    }
  }
};
