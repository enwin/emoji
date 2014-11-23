/*global module:false*/
module.exports = function(){

  return {
    js: {
      files: [ 'scripts/**/*.js', '!scripts/config.js', '!scripts/**/config.js', '!scripts/assets/**/*' ],
      tasks: [ 'js:dev' ],
      options: {
        livereload: true,
        spawn: false
      }
    },
    config: {
      files: [ 'datas/*', 'scripts/config.js', 'scripts/**/config.js' ],
      tasks: [ 'copy:config' ],
      options: {
        livereload: true,
        spawn: false
      }
    },
    gruntfile: {
      files: 'Gruntfile.js',
      tasks: [ 'jshint:gruntfile' ]
    },
    jade: {
      files: [ 'locales/*.yaml', 'pages/**/*.jade' ],
      tasks: [ 'jade:dev', 'notify:jade' ],
      options: {
        livereload: true,
        spawn: false
      }
    },
    media: {
      files: [ 'media/**/*','!media/sprite' ],
      tasks: [ 'copy:img', 'notify:media' ],
      options: {
        livereload: true,
        spawn: false
      }
    },
    stylus: {
      files: ['styles/**/*.styl'],
      tasks: [ 'stylus:dev', 'notify:stylus' ],
      options: {
        livereload: true,
        spawn: false
      }
    }
  };
};
