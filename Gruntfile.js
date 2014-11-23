/*global module:false*/
module.exports = function( grunt ){
  require( 'time-grunt' )( grunt );

  // test GIT branch: if release, publish folder name = "release", else "publish"
  var buildDir = 'app/',
      branch,
      head;

  if( grunt.file.exists( '.git/HEAD' ) ){
    head = grunt.file.read( '.git/HEAD' ).replace(/\n/, '').split( '/' );
    branch = head[ head.length - 1 ].toLowerCase();
  }

  if( branch === "release" ){
    buildDir = 'release/';
  }

  // default grunt configuration
  var defaults = {
    build: buildDir,
    verbose: true,
    paths: {
      dyn: 'media/dyn',
      img: 'media/img'
    }
  };

  require('jit-grunt')( grunt );

  require('load-grunt-config')(grunt, {
    config: defaults
  });

  grunt.registerTask( 'default', [ 'concurrent' ] );

};


