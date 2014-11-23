/*global module:false*/
module.exports = function( grunt ){
  grunt.registerTask( 'js', function( target ){
    target = target || 'dev';
    var tasks = {
      dev: [
        'jshint:dev',
        'browserify:dev',
        'notify:js'
      ],
      release: [
        //'jshint:release',
        'browserify:release',
        'uglify',
        'notify:js'
      ]
    };

    grunt.task.run( tasks[ target ] );
  } );
};
