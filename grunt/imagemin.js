/*global module:false*/
module.exports = {
  media: {
    options: {
      optimizationLevel: 7
    },
    files: [{
       // Enable dynamic expansion
      expand: true,
      // Src matches are relative to this path
      cwd: 'media',
      // Actual patterns to match
      src: ['**/*.{jpg,gif,png}', '!_*/*.{jpg,jpeg}'],
      // Destination path prefix
      dest: '<%= build %>media/'
    }]
  }
};
