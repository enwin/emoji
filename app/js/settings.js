(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
document.addEventListener('visibilitychange', function() {
  if (document.mozHidden) {
    window.close();
  }
});

document.getElementById('back').addEventListener('click', function() {
  // use moz_configure_window for FOS 2.2+
  var activity = new window.MozActivity({
    name: 'moz_configure_window',
    data: { target: 'device' }
  });
  // fallback for 2.0 and 2.1
  activity.onerror = function(){
    new window.MozActivity({
      name: 'configure',
      data: {
        target: 'device'
      }
    });
  };
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

},{}]},{},[1]);
