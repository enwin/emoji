/* global module:false */
var path = require( 'path' ),
    emojis = require('../locales/emoji' ),
    emoji = {},
    files,
    datas,
    devDatas;

module.exports = function(grunt){

  grunt.util._.each( emojis, function( cat, key ){
    emoji[key] = [];
    while( cat.length ){
      emoji[key].push( cat.splice( 0, 21 ) );
    }
  } );

  var getDatas = function(){
    var jadeVars = {};

    // read several yaml for jade datas
    grunt.file.recurse('locales/', function(abspath, rootdir, subdir, filename){

      if( filename.indexOf('json') !== -1 ){
        var data = grunt.file.readJSON(abspath);

        for( var key in data ){
          jadeVars[key] = data[key];
        }
        jadeVars.emoji = emoji;
        grunt.config.set('jadedatas', jadeVars);
      }
    });
  };

  getDatas();

  datas = grunt.config.get('jadedatas');
  devDatas = grunt.util._.extend( { dev: true }, datas );

  files = [{
    expand: true,
    cwd: 'pages/',
    src: [ '**/*.jade', '!_**/*.jade', '!_*.jade', "!tree.jade" ],
    ext: '.html',
    dest: '<%= build %>'
  }];

  grunt.event.on('watch', function(action, filepath) {

    var filename = path.basename( filepath );
    if( '.jade' === path.extname( filepath ) || '.yaml' === path.extname( filepath ) ){
      var src = files;
      if( 'pages' === path.dirname( filepath ) && '.yaml' !== path.extname( filepath ) && '_layout.jade' !== filename ){
        src = [{
          expand: true,
          cwd: 'pages/',
          src: [ path.basename( filepath ) ],
          ext: '.html',
          dest: '<%= build %>'
        }];
      }
      else if( '.yaml' === path.extname( filepath ) ){
        getDatas();
        grunt.config( 'jade.dev.options.data', grunt.util._.extend( { dev: true }, grunt.config.get('jadedatas') ) );
      }
      grunt.config( 'jade.dev.files', src );

    }
  });

  return {
    dev: {
      files: [{
        expand: true,
        cwd: 'pages/',
        src: [ '**/*.jade', '!_**/*.jade', '!_*.jade', "!tree.jade" ],
        ext: '.html',
        dest: '<%= build %>'
      }],
      options: {
        data: devDatas,
        pretty: true,
        selfClose: true,
        compileDebug: false
      }
    },
    release: {
      files: '<%= jade.dev.files %>',
      options: {
        data: datas,
        pretty: true,
        selfClose: true,
        compileDebug: false
      }
    }
  };
};
