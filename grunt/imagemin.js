/*global module:false*/
module.exports = {
  media: {
    options: {
      optimizationLevel: 7,
      progressive: true
    },
    files: [{
       // Enable dynamic expansion
      expand: true,
      // Src matches are relative to this path
      cwd: 'media',
      // Actual patterns to match
      src: ['**/*.{jpg,jpeg}', '!_*/*.{jpg,jpeg}'],
      // Destination path prefix
      dest: '<%= build %>media/'
    }]
  }
};
