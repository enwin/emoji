module.exports = function( app ){
  return {
    element: app.el,
    keyelts: app.datas.keyEls,
    page: {
      keys: app.datas.key
    },
    highlight: function( keyname ){
      app.datas.keyEls[ keyname ].classList.add( 'touch' );
    },
    unhighlight: function( keyname ){
      app.datas.keyEls[ keyname ].classList.remove( 'touch' );
    },
    showAlternatives: function(){},
    getKeyRect: function( keyname ){
      var el = app.datas.keyEls[ keyname ];

      if( !el.rect ){
        el.rect = el.getBoundingClientRect();

        if (el.rect.width === 0){
          return el.rect;
          //throw Error('KeyboardPageView is not laid out yet: ' + keyname);
        }

        el.rect.cx = (el.rect.left + el.rect.right) / 2;
        el.rect.cy = (el.rect.top + el.rect.bottom) / 2;
      }

      return el.rect;
    },
    move: function( next ){

      var page = app.datas.currentPage;

      // TODO clean selector
      var currentScreen = page.currentScreen,
          nextScreen = currentScreen[ next ? 'nextElementSibling' : 'previousElementSibling' ],
          index,
          out = 100*(next ? -1 : 1 );

      if( !nextScreen ){
        return;
      }

      nextScreen.style.transform = ['translateX(', out*-1 ,'%)'].join('');
      nextScreen.style.display = 'block';

      window.requestAnimationFrame( function(){
        nextScreen.parentNode.classList.add( 'move' );

        window.requestAnimationFrame(function(){

          if( page.pager.style ){
            index = Array.prototype.indexOf.call( page.pages, nextScreen );
            page.pager.style.transform = ['translateX(',(100*index),'%)'].join('');
          }

          page.currentScreen = nextScreen;
          nextScreen.style.transform = 'translateX(0)';
          currentScreen.style.transform = ['translateX(', out ,'%)'].join('');

          // clear key position
          app.clearKeyRect();
        });
      } );

    }
  };
};
