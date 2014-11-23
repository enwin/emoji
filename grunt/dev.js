/*global module:false*/
module.exports = function( grunt ){
  grunt.registerTask( 'dev', function(){
    grunt.task.run( [
      'clean:build',
      'copy:files',
      'copy:config',
      'stylus:dev',
      'jade:dev',
      'js:dev',
      'notify:dev'
    ] );
  } );
};
