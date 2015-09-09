//модуль запуска мобильного меню
var mobileMenu = (function(){
    var 
        button = $('#mobile-menu-button'),
        menu = $('#mobile-menu'),
       firstClick = true ;
       btnClick = false;

    function _openMenu(){

        menu.show();
        firstClick = true;
        btnClick = true;
    }

    function _closeMenu(){

    	menu.hide();
    	 btnClick = false;
    }

return {
    publicMethod : function(){
       
    },
    
    init: function(){
        button.on('click', function(e){
            if(!btnClick){ 
        	_openMenu();
        }
            
        });
        	
        	$(document).bind('click', function(e) {
        		
            if ((!firstClick && $(e.target).closest(menu).length == 0  )  ) {

                _closeMenu();
                e.stopPropagation();
              ;

            }

             firstClick = false;
            
           
        });
        
       

    }
}
}());
