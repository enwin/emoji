document.addEventListener('visibilitychange', function() {
  if (document.mozHidden) {
    window.close();
  }
});

document.getElementById('back').addEventListener('click', function() {
  var activity = new MozActivity({
    name: 'configure',
    data: {
      target: 'device'
    }
  });
});

// get the keyboard settings
var settings = JSON.parse( window.localStorage.getItem( 'emoji.settings' ) ) || {
      vibrate: false,
      sound: false
    },
    recentsEmojis = JSON.parse( window.localStorage.getItem( 'recents' ) ) || [],
    // get form
    form = document.getElementById( 'settings' ),
    recentButton = document.getElementById( 'recent' ),
    update = {};

if( recentsEmojis.length ){
  recentButton.removeAttribute( 'disabled' );
}

// update form with settings
for( var key in settings ){
  form[ key ].checked = settings[ key ];
}

// listen for checbox change to update settings
form.addEventListener( 'change' , function( e ){
  var input = e.target;

  settings[ input.name ] = input.checked;

  window.localStorage.setItem( 'emoji.settings', JSON.stringify( settings ) );

  // store that at least one setting has been changed
  update.setting = true;
  window.localStorage.setItem( 'emoji.updated', JSON.stringify( update ) );

} );

recentButton.addEventListener( 'click', function(){
  if( window.confirm( 'clear emoji history?' ) ){
    window.localStorage.setItem( 'recents', '[]' );
    recentButton.setAttribute( 'disabled', 'disabled' );

    // store that at least one setting has been changed
    update.recents = true;
    window.localStorage.setItem( 'emoji.updated', JSON.stringify( update ) );
  }
} );
