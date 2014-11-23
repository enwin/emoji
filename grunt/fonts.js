/* global module:false */
module.exports = function( grunt ) {

  grunt.registerTask( 'fonts', function(){
    grunt.task.run( [
      'webfont',
      'copy:fonts',
      'notify:fonts'
    ] );

  } );

};
