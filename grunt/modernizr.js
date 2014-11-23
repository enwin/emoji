/* global module: false */
module.exports = {
  build: {
    devFile: 'remote',
    outputFile: '<%= build%>js/modernizr.js',

    extra: {
      cssgradients: true,
      shiv: false,
      load: false
    },

    extensibility: {
      prefixed: true,
      testprop: true,
      testallprops: true,
      domprefixes: true
    },

    uglify: true,
    parseFiles: false
  }
};
