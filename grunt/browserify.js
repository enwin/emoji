/*global module:false*/

module.exports = {
  dev: {
    files: {
      "<%= build %>js/scripts.js": [ 'scripts/init.js' ],
      "<%= build %>js/settings.js": [ 'scripts/settings.js' ]
    },
    options: {
      browserifyOptions: {
        debug: true
      }
    }
  },
  release: {
    files: "<%= browserify.dev.files %>"
  }
};
