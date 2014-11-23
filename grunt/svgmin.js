/*global module:false*/
module.exports = {
  media: {
    files: [{
       // Enable dynamic expansion
      expand: true,
      // Src matches are relative to this path
      cwd: 'media',
      // Actual patterns to match
      src: ['{img,dyn}/**/*.svg', '!{img,dyn}/_*/*.svg'],
      // Destination path prefix
      dest: '<%= build %>media/'
    }]
  }
};
