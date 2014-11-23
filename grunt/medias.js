/*global module:false*/
module.exports = function( grunt ){
  grunt.registerTask( 'media', function(){
    grunt.task.run( [
      'copy:media',
      'img',
      'notify:media'
    ] );
  } );
};
