/* global module:false */
module.exports = function( grunt ) {

  var tasks = [
    'clean:build',
    'copy:files',
    'copy:config',
    'jade:release',
    'js:release',
    'stylus:release',
    'cssmin:release',
    'imagemin',
    'notify:release'
  ];

  grunt.registerTask( 'release', function(){

    grunt.task.run( tasks );

  } );
};
