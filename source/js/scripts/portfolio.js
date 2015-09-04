////////////модуль анимации на странице портфоолио - добавление сайта/////////////
var animation_portfolio_add = (function() {

    var hover_element = $(".add_project");
    var change_propertis = $(".add_project>img");

    function _hover_effect() {

        hover_element.hover(_mouseON, _mouseOFF);
        //  console.log('hi');
    };

    function _mouseON() {
        change_propertis.css('top', '20px').stop().animate({
            'top': 0
        }, 500);
        //console.log('mouseON');
    };

    function _mouseOFF() {
        change_propertis.stop().animate({
            'top': 0
        }, 500);
        //console.log('mouseOFF');
    }

    return {

        publicMethod: function() {
            _hover_effect();
        },

        init: function() {
            this.publicMethod();
        }
    }

}());
//////////////////модуль отображения анимации на странице портфолио//////////////////////////////////////////////
var animation_portfolio_item = (function() {

    var parent_element = $('.my_works');

    function _hover_el() {
        parent_element.on({
            'mouseenter': _mouse_enter,
            'mouseleave': _mouse_leave
        }, 'li>a');
        console.log('hi');
    };
//визуальные эффекты при наведении
    function _visual_on(select) {

        if (select.target.localName === 'a') {

            $(select.target.firstElementChild).stop(true,true).animate({
                'opacity': 0.5
            }, 500);
            $(select.target.lastElementChild).stop(true, true).animate({
                'opacity': 1,
                'width': 155,
                'height': 25,
                'left': 10
            }, 500);
        } else {

            $(select.target).stop(true,true).animate({
                'opacity': 0.5
            }, 500);
            $(select.target.nextElementSibling).stop(true, true).animate({
                'opacity': 1,
                'width': 155,
                'height': 25,
                'left': 10
            }, 500);
        }

    };

// визуальные эффекты при снятии мыши
    function _visual_off(select) {

        if (select.target.localName === 'a') {


            $(select.target.firstElementChild).stop(true,true).animate({
                'opacity': 1
            }, 500);
            $(select.target.lastElementChild).stop(true, true).animate({
                'opacity': 0,
                'width': 0,
                'height': 0,
                'left': 80
            }, 500);
        } else {

            $(select.target).stop(true,true).animate({
                'opacity': 1
            }, 500);
            $(select.target.nextElementSibling).stop(true, true).animate({
                'opacity': 0,
                'width': 0,
                'height': 0,
                'left': 80
            }, 500);
        }

    };
//обработка событий
    function _mouse_enter(e) {

        _visual_on(e);

    };

    function _mouse_leave(e) {

        _visual_off(e);

    }

    return {

        publicMethod: function() {
            _hover_el();
        },

        init: function() {
            this.publicMethod();
        }
    }

}());
//////модуль оформления upload на модальном окне страницы партфолио///////////////////////////////////////////////
var upload_field = (function(){

var fileupload = $('#f_upl');
var inpt = fileupload.children('input');
var p = fileupload.children('p');

function _upl_field(){
  var text = $(inpt).val();
  text = text.substring(12);

 $(p).html(text);
 $(p).addClass('bold-clr');
 $(p).removeClass('placehold');
 $('.bold-clr').css('width','200px');
};

function _upload(){
  $(inpt).change(_upl_field);
}
return {
publicMethod : function(){
  _upload();
},
init: function(){
this.publicMethod();
}
}
}());
////////////////////////модуль popup страницы портфолио//////////////////////////

var popup = (function(){

  var mod = $('#add_prj');
  var cls = $('#close');
   var wnd = $('#mod-form_add');
   var bgrd = $('#back');

function _event(){
// какие-то действия
  mod.click(_open);
  cls.click(_close);
  bgrd.click(_close);
};

function _open() {
 wnd.stop(true,true).show();
 wnd.stop(true,true).animate({'top':($('body').height() - wnd.outerHeight())/2},500);
 bgrd.stop(true,true).fadeIn(500);
 window.scrollTo(0,($('body').height() - wnd.outerHeight())/2-100);

};

function _close() {

  
  wnd.stop(true,true).animate({'top':-600},500);
 // wnd.stop(true,true).hide(1000);
  bgrd.stop(true,true).fadeOut(100);
  
}

return {
    closeWnd : function() {
       wnd.hide();
    },
publicMethod : function(){
  _event();
},
init: function(){
this.publicMethod();
}
}
}
());
