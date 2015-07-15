'use stict';

/* global KeyEvent:true*/

var touch = require( './helpers/touch_handler' ),
    layout = require( './modules/layout' );

var App = function(){

  //window.localStorage.removeItem( 'recents' );

  this.init = function(){
    this.process();
    this.bind();

    // fill recent page
    this.updateRecent();

    // shotcut to display first emoji page
    this.switchPage( this.els.switches[ this.datas.recents.length ? 0 : 1 ] );

    // force first display of the keyboard
    this.handleResize();
  };


  this.addRecentKey = function( el ){
    var name = [ 'recent', el.dataset.key ].join('-');

    el.dataset.cat = 'recent';

    //ensure the rollover is not enabled
    el.classList.remove( 'touch' );

    this.datas.keyEls[ name ] = el;
    this.datas.key[ name ] = {
      keycode: el.dataset.key,
      keyname: el.getAttribute( 'aria-label' )
    };

    this.els.recents.appendChild( el );
  };

  this.bind = function(){
    this.el.addEventListener( 'transitionend', this.handlePageSwitch.bind( this ) );

    navigator.mozInputMethod.addEventListener( 'inputcontextchange', this.handleResize.bind( this ) );

    this.touchHandler.addEventListener( 'key', this.handleKey.bind( this ) );

    document.addEventListener( 'visibilitychange', this.handleVisibility.bind( this ) );

    window.screen.addEventListener( 'mozorientationchange', this.handleResize.bind( this ) );
  };

  // invalidate all key coords
  this.clearKeyRect = function(){
    for( var keyname in this.datas.keyEls ){
      this.datas.keyEls[ keyname ].rect = null;
    }
  };

  this.emitSound = function( sound ){

    var audio = new Audio('./media/sounds/'+sound+'.wav');

    audio.play();
  };

  this.extendWithSettings = function(){

    var settings = JSON.parse( window.localStorage.getItem( 'emoji.settings' ) ) || {
      vibrate: false,
      sound: false
    };
    // extend with settings
    for( var key in settings ){
      this.datas[ key ] = settings[ key ];
    }

  };

  this.process = function(){
    this.el = document.getElementById( 'layout' );

    this.els = {
      categories: Array.prototype.slice.call( document.querySelectorAll( '[id^=page]' ) ),
      recents: document.querySelector( '#page-recent .show' ),
      keys: Array.prototype.slice.call( document.querySelectorAll( '.key' ) ),
      switches: Array.prototype.slice.call( document.querySelectorAll( '.key.item' ) )
    };

    this.datas = {
      // map of element by its keycode
      keyEls: {},
      // array of formated keycodes
      key: {},
      recents: JSON.parse( window.localStorage.getItem( 'recents' ) ) || []
    };

    this.extendWithSettings();

    this.els.keys.forEach( function( keyEl ){
      var symbol = keyEl.dataset.key,
          name = symbol;

      if( keyEl.dataset.cat ){
        name = [ keyEl.dataset.cat, symbol ].join('-');
      }

      this.datas.keyEls[ name ] = keyEl;
      this.datas.key[ name ] = {
        keycode: symbol,
        keyname: keyEl.getAttribute( 'aria-label' )
      };
    }, this );

    this.touchHandler = new touch();

    this.touchHandler.setPageView( new layout( this ) );

  };

  this.handleKey = function( e ){
    var el = this.datas.keyEls[ e.detail.key ];

    if( this.datas.vibrate && window.navigator.vibrate ){
      window.navigator.vibrate( 50 );
    }

    if( el.classList.contains( 'item' ) ){

      if( this.datas.sound ){
        this.emitSound( 'special' );
      }

      this.switchPage( el );
      return;
    }

    switch( e.detail.key ){
      // display next keyboard
      case 'switch':
        if( e.detail.long ){
          navigator.mozInputMethod.mgmt.showAll();
        }
        else{
          if( this.datas.sound ){
            this.emitSound( 'special' );
          }

          navigator.mozInputMethod.mgmt.next();
        }
        break;
      // send backspace key
      case 'delete':
        if( e.detail.long ){
          return;
        }
        if( this.datas.sound ){
          this.emitSound( 'special' );
        }
        navigator.mozInputMethod.inputcontext.sendKey( KeyEvent.DOM_VK_BACK_SPACE, 0, 0);
        break;
      // send emoji
      default:
        if( e.detail.long ){
          return;
        }
        if( this.datas.sound ){
          this.emitSound( 'key' );
        }
        navigator.mozInputMethod.inputcontext.setComposition( this.datas.key[ e.detail.key ].keycode );
        navigator.mozInputMethod.inputcontext.endComposition( this.datas.key[ e.detail.key ].keycode );
        this.updateRecent( e.detail.key );
    }
  };

  // called by the two pages that are moving
  this.handlePageSwitch = function( e ){
    var el = e.target;

    if( el.classList.contains( 'pager' ) ){
      return;
    }

    // switch show class on page moving
    //  remove it on the current page
    //  add it to the new one
    el.classList.toggle( 'show', !el.classList.contains( 'show' ) );

    // clean inline style
    el.removeAttribute( 'style' );

    // remove the css transition class
    el.parentNode.classList.remove( 'move' );

    this.datas.switching = false;
  };

  this.handleResize = function(){
    window.resizeTo( window.innerWidth, this.el.clientHeight );
    this.clearKeyRect();
  };

  this.handleVisibility = function(){
    if( document.hidden ){
      return;
    }

    // update keyboard with settings
    this.extendWithSettings();

    // update recent page if it has been updated
    var recents = JSON.parse( window.localStorage.getItem( 'recents' ) ) || [];
    if( recents.length !== this.datas.recents.length ){

      this.datas.recents = recents;

      // fill recent page
      this.updateRecent();

      // shotcut to display first emoji page
      this.switchPage( this.els.switches[ this.datas.recents.length ? 0 : 1 ] );
    }

  };

  // change category page based on the category key passed
  //  move to first page of category if key pressed is the current category
  this.switchPage = function( el ){
    var displayed = el.getAttribute( 'aria-expanded' ),
        page = document.getElementById( el.getAttribute( 'aria-controls' ) );

    if( 'true' === displayed ){
      var currentPage = document.querySelector( '.show li.show' ),
          nextPage = currentPage.parentNode.firstElementChild,
          index,
          out = 100;

      if( this.datas.switching || !nextPage || currentPage === nextPage ){
        return;
      }

      this.datas.switching = true;

      // clear key position
      this.clearKeyRect();

      if( page.pager.style ){
        index = Array.prototype.indexOf.call( page.pages, nextPage );
        page.pager.style.transform = ['translateX(',(100*index),'%)'].join('');
      }

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

    // set the pager width
    if( !page.pager ){
      page.pager = page.querySelector( '.pager' );

      if( !page.pager ){
        page.pager = true;
        return;
      }

      page.pages = page.querySelectorAll( 'li' );

      page.pager.style.width = [ (100/page.pages.length).toFixed(3), '%'].join('');

    }
  };

  this.updateRecent = function( keyname ){
    var keyEl;
    if( keyname ){
      keyEl = this.datas.keyEls[ keyname ];

      if( keyEl && keyname && !~this.datas.recents.indexOf( keyname ) && 'recent' !== keyEl.dataset.cat ){

        // prepend the new key
        this.datas.recents.splice( 0, 0, keyname);

        // keep the recent array at a max of 21 keys
        this.datas.recents = this.datas.recents.splice( 0, 21 );

        window.localStorage.setItem( 'recents', JSON.stringify( this.datas.recents ) );

        //this.addRecentKey( this.datas.keyEls[ keyname ].cloneNode( true ) );
      }
      //return;
    }

    this.els.recents.innerHTML = '';

    this.datas.recents.forEach( function( keyname ){
      if( this.datas.keyEls[ keyname ] ){
        this.addRecentKey( this.datas.keyEls[ keyname ].cloneNode( true ) );
      }
    }, this );

  };

  window.onload = this.init.bind( this );
};

new App();
