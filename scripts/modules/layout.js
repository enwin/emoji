module.exports = function( app ){
  return {
    element: app.el,
    keyelts: app.datas.keyEls,
    page: {
      keys: app.datas.key
    },
    highlight: function( keycode ){
      app.datas.keyEls[ keycode ].classList.add( 'touch' );
    },
    unhighlight: function( keycode ){
      app.datas.keyEls[ keycode ].classList.remove( 'touch' );
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
      // TODO clean selector
      var currentPage = document.querySelector( '.show li.show' ),
          nextPage = currentPage[ next ? 'nextElementSibling' : 'previousElementSibling' ],
          out = 100*(next ? -1 : 1 );


      //console.log( currentPage, nextPage );

      if( !nextPage ){
        return;
      }

      // clear key position
      app.clearKeyRect();

      nextPage.style.transform = ['translateX(', out*-1 ,'%)'].join('');
      nextPage.style.display = 'block';

      window.requestAnimationFrame( function(){
        nextPage.parentNode.classList.add( 'move' );

        window.requestAnimationFrame(function(){
          nextPage.style.transform = 'translateX(0)';
          currentPage.style.transform = ['translateX(', out ,'%)'].join('');
        });
      } );

    }
  };
};
