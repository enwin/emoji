/*global module:false*/

module.exports = {
  dev: {
    files: {
      "<%= build %>js/scripts.js": [ 'scripts/init.js' ]
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
