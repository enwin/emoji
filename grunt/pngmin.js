/*global module:false*/
module.exports = {
  media: {
    options: {
      ext: '.png',
      force: true,
      speed: 1
    },
    files: [{
       // Enable dynamic expansion
      expand: true,
      // Src matches are relative to this path
      cwd: 'media',
      // Actual patterns to match
      src: ['{img,dyn}/**/*.png', '!{img,dyn}/_*/*.png'],
      // Destination path prefix
      dest: '<%= build %>media/'
    }]
  },

  animations: {
    options: {
      ext: '.png',
      force: true,
      colors: 16
    },
    files: [{
       // Enable dynamic expansion
      expand: true,
      // Src matches are relative to this path
      cwd: 'media',
      // Actual patterns to match
      src: ['animations/**/*.png'],
      // Destination path prefix
      dest: '<%= build %>media/'
    }]
  }
};
