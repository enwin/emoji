'use stict';

/* global KeyEvent:true*/

var touch = require( './modules/touch_handler' ),
    layout = require( './modules/layout' );

var App = function(){

  this.init = function(){
    this.process();
    this.bind();

    // shotcut to display first emoji page
    this.switchPage( document.querySelector( '.menu li + li button' ) );
  };

  this.bind = function(){
    this.el.addEventListener( 'transitionend', this.handlePageSwitch.bind( this ) );

    navigator.mozInputMethod.addEventListener('inputcontextchange', this.handleResize.bind( this ) );

    this.touchHandler.addEventListener( 'key', this.handleKey.bind( this ) );
  };

  // invalidate all key coords
  this.clearKeyRect = function(){
    this.els.keys.forEach( function( keyEl ){
      keyEl.rect = null;
    }, this );
  };

  this.process = function(){
    this.el = document.getElementById( 'layout' );

    this.els = {
      categories: Array.prototype.slice.call( document.querySelectorAll( '[id^=page]' ) ),
      keys: Array.prototype.slice.call( document.querySelectorAll( '.key' ) ),
      switches: Array.prototype.slice.call( document.querySelectorAll( '.key.item' ) ),
    };

    this.datas = {
      keyEls: {},
      key: {}
    };

    this.els.keys.forEach( function( keyEl ){
      var symbol = keyEl.dataset.key;
      this.datas.keyEls[ symbol ] = keyEl;
      this.datas.key[ symbol ] = {
        keycode: symbol
      };
    }, this );



    this.touchHandler = new touch();

    this.touchHandler.setPageView( new layout( this ) );

  };

  this.handleKey = function( e ){
    var el = this.datas.keyEls[ e.detail ];

    if( el.classList.contains( 'item' ) ){
      this.switchPage( el );
      return;
    }


    switch( e.detail ){
      // display next keyboard
      case 'switch':
        navigator.mozInputMethod.mgmt.next();
        break;
      // send backspace key
      case 'delete':
        navigator.mozInputMethod.inputcontext.sendKey( KeyEvent.DOM_VK_BACK_SPACE, 0, 0);
        break;
      // send emoji
      default:
      navigator.mozInputMethod.inputcontext.setComposition( e.detail );
      navigator.mozInputMethod.inputcontext.endComposition( e.detail );
    }
  };

  // called by the two pages that are moving
  this.handlePageSwitch = function( e ){
    var el = e.target;
    // switch show class on page moving
    //  remove it on the current page
    //  add it to the new one
    el.classList.toggle( 'show', !el.classList.contains( 'show' ) );

    // clean inline style
    el.removeAttribute( 'style' );

    // remove the css transition class
    el.parentNode.classList.remove( 'move' );
  };

  this.handleResize = function() {
    window.resizeTo( window.innerWidth, this.el.clientHeight );
    this.clearKeyRect();
  };

  this.switchPage = function( el ){
    var displayed = el.getAttribute( 'aria-expanded' ),
        page = document.getElementById( el.getAttribute( 'aria-controls' ) );

    if( 'true' === displayed ){


      var currentPage = document.querySelector( '.show li.show' ),
          nextPage = currentPage.parentNode.firstElementChild,
          out = 100;


      //console.log( currentPage, nextPage );

      if( !nextPage || currentPage === nextPage ){
        return;
      }

      // clear key position
      this.clearKeyRect();

      nextPage.style.transform = ['translateX(', out*-1 ,'%)'].join('');
      nextPage.style.display = 'block';

      window.requestAnimationFrame( function(){
        nextPage.parentNode.classList.add( 'move' );

        window.requestAnimationFrame(function(){
          nextPage.style.transform = 'translateX(0)';
          currentPage.style.transform = ['translateX(', out ,'%)'].join('');
        });
      } );

      return;
    }

    // HEAVY?
    this.els.switches.forEach( function( key ){
      key.setAttribute( 'aria-expanded', key === el );
    }, this );

    this.els.categories.forEach( function( item ){
      item.classList.toggle( 'show', item === page  );
    }, this );

    this.clearKeyRect();
  };

  window.onload = this.init.bind( this );

    // var keys = document.querySelectorAll( '.key' ),
    //     pageSwitches = document.querySelectorAll( '.key.item' ),
    //     pages = document.querySelectorAll( '[id^=page]' ),
    //     keyEls = {},
    //     key = {};

    // Array.prototype.forEach.call( keys, function( item ){
    //   var symbol = item.dataset.key;
    //   keyEls[ symbol ] = item;
    //   key[ symbol ] = {
    //     keycode: symbol
    //   };
    // } );

    // document.getElementById('layout').addEventListener( 'transitionend', function(e ){
    //   var el = e.target;

    //   el.classList.toggle( 'show', !el.classList.contains( 'show' ) );

    //   el.parentNode.classList.remove( 'move' );

    //   el.removeAttribute( 'style' );

    // } );

    // var test = new touch();

    // test.setPageView( new layout(this) );

    // //window.layout = layout;

    // test.addEventListener( 'key', function( e ){
    //   var el = keyEls[ e.detail ];
    //   if( el.classList.contains( 'item' ) ){
    //     switchPage( el );
    //     return;
    //   }


    //   switch( e.detail ){
    //     case 'switch':
    //       navigator.mozInputMethod.mgmt.next();
    //       break;
    //     case 'delete':
    //       // console.log( navigator.mozInputMethod.inputcontext );
    //       // navigator.mozInputMethod.inputcontext.textBeforeCursor = navigator.mozInputMethod.inputcontext.textBeforeCursor.slice(0, -1);
    //       navigator.mozInputMethod.inputcontext.sendKey( KeyEvent.DOM_VK_BACK_SPACE, 0, 0);
    //       break;
    //     default:
    //     navigator.mozInputMethod.inputcontext.setComposition( e.detail );
    //     navigator.mozInputMethod.inputcontext.endComposition( e.detail );
    //   }
    // } );

    // // handle keyboard display on focus
    // navigator.mozInputMethod.addEventListener('inputcontextchange', function() {
    //   window.resizeTo(window.innerWidth, document.getElementById('layout').clientHeight);
    //   clearRect();
    // } );

    // var clearRect = function(){
    //   // invalidate all key coords
    //   Array.prototype.forEach.call( keys, function( item ){
    //     item.rect = null;
    //   });
    // };

    // var switchPage = function( el ){
    //   var page = document.getElementById( el.getAttribute( 'aria-controls' ) );

    //   // HEAVY?
    //   Array.prototype.forEach.call( pageSwitches, function( key ){
    //     key.setAttribute( 'aria-expanded', key === el );
    //   } );

    //   Array.prototype.forEach.call( pages, function( item ){
    //     item.classList.toggle( 'show', item === page  );
    //   } );

    //   clearRect();
    // };


    // switchPage( document.querySelector( '.menu li + li button' ) );
  //};
};

new App();


