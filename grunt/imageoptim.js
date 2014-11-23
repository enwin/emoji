/* global module:false */
module.exports = function( grunt ) {

  grunt.registerTask( 'imageoptim', function(){

    grunt.task.run( [
      'pngmin',
      'imagemin',
      'svgmin'
    ] );

  } );

};
