/* global module: false */
module.exports = {
  options: {
    banner: '<%= banner %>',
    wrap: 'test',
    exportAll: true,
  },
  dist: {
    files: {
      '<%= build %>js/scripts.js': '<%= build %>js/scripts.js'
    }
  }
};
