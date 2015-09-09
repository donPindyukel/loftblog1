



////////////////////////////////////////////////////////////////////////////
//CODE 
////////////////////////////////////////////////////////////////////////////


$(document).ready(function(){

  if ($(".add_project").length) {
    animation_portfolio_add.init();
}


if($(".my_works").length) { 
  animation_portfolio_item.init();
 }

if($('#f_upl').length) {
  upload_field.init();
}

if($('#add_prj').length) {popup.init();}

if ($('.popup').length) {
    Popups.init();
  }

/*if ($('#error-add').length) {
  popPortfolioAdd.init();
}*/

popMsgSend.init();
  popPortfolioAdd.init();


$('#form_auth').on('submit', function(e){
  e.preventDefault();  
 
 var $this = $(this);

if(validateThis($this)) {
    
        var 
            $this = $(this);

            postFormData($this, function(data) {
                var
                    reqPopup = data.status ? '#success' : '#error';
                   // console.log(data.status);
                    Popups.open(reqPopup);
                  //console.log('dsg');
            });
        }
   
    }); 

$('#mod-form-add-prj').on ('submit', function(e){
  e.preventDefault();

  var $this = $(this);
  if (validateThis($this)){
   
    var 
        $this = $(this);
        
        postFormDatafiles($this,function(data) {

         var 
             answerUpl = data.status ? 'ok' : 'not';
            // console.log(answerUpl);
             popPortfolioAdd.open(answerUpl);

        });

  }
});

$('#contact-form').on('submit', function(e){
  e.preventDefault();

  var 
      $this = $(this);

  if (validateThis($this)){
     postFormDatafiles($this, function(data){
 
        answerUpl = data.status ? 'ok' : 'not';
      //      console.log(answerUpl);
              popMsgSend.open(answerUpl);
          });
  //console.log('puk');


  }
  else{console.log('validate');}
});


if($("#mobile-menu-button").length) { 
  mobileMenu.init();
 }

});


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

//модуль обработчика серверного ответа формы контактов
var popMsgSend = (function(){
    
    var 
        errorMsg = $('#error-msg');
       
        successMsg = $('#success-add');
        bgrd = $('#back');

    function _closeErr(){
        
        if (errorMsg.length){
            
            errorMsg.hide();
            bgrd.stop(true,true).fadeOut(100);
            //console.log('yaaaaahooo');
        }
    }

    function _closeSucc(){ 
        if (successMsg.length){

            successMsg.hide();
            bgrd.stop(true,true).fadeOut(100);
        }
        

    }

    return {
        
        open : function(id){
            

           if (id === 'not') {

               
                errorMsg.show();
               // errorInnerMsg.show();
                 bgrd.stop(true,true).fadeIn(500);
           }

           if (id === 'ok') {
                successMsg.show();
                 bgrd.stop(true,true).fadeIn(500);

           }
        },

        init: function(){
        
            $('.close-error, #back').on('click', function(e){
                e.preventDefault();


                _closeErr();
            });

            $('.close-success-pict, #back').on('click', function(e){
                e.preventDefault();
             

                _closeSucc();
            });
        }
    }
}());




//Обработчик серверного ответа при добавлении в портфорлио

var popPortfolioAdd = (function(){
    
    var 
        errorMsg = $('#error-add');
        successMsg = $('#success-add');
        bgrd = $('#back');

    function _closeErr(){
        
        if (errorMsg.length){
            
            errorMsg.hide();
            $('#mod-form_add').css('height','495');    
            bgrd.show();
            //console.log('yaaaaahooo');
        }
    }

    function _closeSucc(){ 
        if (successMsg.length){

            successMsg.hide();
            bgrd.stop(true,true).fadeOut(100);
        }
        

    }

    return {
        
        open : function(id){
            

           if (id === 'not') {
              //  console.log('hi');
                $('#mod-form_add').css('height','557');
                errorMsg.show();
 
           }

           if (id === 'ok') {
                successMsg.show();
                popup.closeWnd();

           }
        },

        init: function(){
        
            $('.close-error-pict').on('click', function(e){
                e.preventDefault();


                _closeErr();
            });

            $('.close-success-pict, #back').on('click', function(e){
                e.preventDefault();
             

                _closeSucc();
            });
        }
    }
}());



//попап авторизации
var Popups = (function() {

    var
        popups = $('.popup');

    function _close(){
        popups.hide();
    }

    return {
        
        init : function(){
            $('.popup__close, .popup__overlay').on('click', function(e){
                e.preventDefault();

                _close();
            });
        },

        open: function(id) {
            var
                reqPopup = popups.filter(id);

            _close();

            reqPopup.fadeIn(300);
        }
    }
}());



//////////////////////////////////////////////////////////////
//TOOLTIPS
//////////////////////////////////////////////////////////////
//////////////отправка ajax с file upload///////////////////////////////////
function postFormDatafiles (form, successCallback){

    var 
        host         = form.attr('action'),
        dataObject   = new FormData(form[0]);

        if (!host) {
        console.log('set action attribute to your form, you fool!!');
    }

        // Отправляем запрос
 
    var defObj = $.ajax({
        url: host,
        type: 'POST',
        data: dataObject,
        cache: false,
        dataType: 'json',
        processData: false, // Не обрабатываем файлы (Don't process the files)
        contentType: false, // Так jQuery скажет серверу что это строковой запрос
        success: successCallback,
    });

    //return defObj;
}

/////////////отправка ajax простая//////////////////////////////////
function postFormData(form, successCallback) {
    var
        host        = form.attr('action'),
        reqFields   = form.find('[name]'),
        dataObject  = {};

    //var data = 

    if (!host) {
        console.log('set action attribute to your form, you fool!!');
    }

    reqFields.each(function(){
        var
            $this = $(this),
            value = $this.val(),
            name  = $this.attr('name');

        dataObject[name] = value;

    });

  

    $.post(host, dataObject, successCallback);
}



/* --------- валидация --------- */

function validateThis(form) {

    var
        nameType = form.find("[data-validation='name']"),
        passType = form.find("[data-validation='pass']"),
        mailType = form.find("[data-validation='mail']"),
        labelType = form.find("[data-validation='label']"),
        pictType = form.find("[data-validation='pict']"),
        urlType = form.find("[data-validation='url_prj']"),
        textType = form.find("[data-validation='text']"),

        isValidname = false,
        isValidpass = false,
        isValidlabel = false,
        isValidpict = false,
        isValidurl = false,
        isValidtext = false,
        isValidmail = false;


   nameType.each(function(){

        var
            $this = $(this),
            notEmptyField = !!$this.val();

        if (notEmptyField) {
            isValidname = true;
        } else {
            $this.tooltip({
                content: 'Введите логин',
                position: 'left'
            });

            isValidname = false;
        }
    });

    mailType.each(function(){
        var
            $this = $(this),
            regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
            isMail = regExp.test($this.val());

        if (isMail) {
            isValidmail = true;
        } else {
            $this.tooltip({
                content : 'Неверный e-mail',
                position : 'right'
            });
            isValidmail = false;
        }
    });

   labelType.each(function(){

        var
            $this = $(this),
            notEmptyField = !!$this.val();

        if (notEmptyField) {
            isValidlabel = true;
        } else {
            $this.tooltip({
                content: 'Введите название проекта',
                position: 'left'
            });

            isValidlabel = false;
        }
    });

   pictType.each(function(){

        var
            $this = $(this),
            notEmptyField = !!$this.val();

        if (notEmptyField) {
            isValidpict = true;
        } else {
            $this.parent().tooltip({
                content: 'Загрузите картинку проекта',
                position: 'left'
            });

        $this.parent().css({
                 'background':'#fdd5d2',
                 'border-color':'red'
                    });
        $this.parent().addClass('modif_par');
            isValidpict = false;
        }
    });

   urlType.each(function(){

        var
            $this = $(this),
            notEmptyField = !!$this.val();

        if (notEmptyField) {
            isValidurl = true;
        } else {
            $this.tooltip({
                content: 'Введите ссылку на проект',
                position: 'left'
            });

            isValidurl = false;
        }
    });

   textType.each(function(){

        var
            $this = $(this),
            notEmptyField = !!$this.val();

        if (notEmptyField) {
            isValidtext = true;
        } else {
            $this.tooltip({
                content: 'Введите описание проекта',
                position: 'left'
            });
            
            isValidtext = false;
        }
    });


    passType.each(function(){

        var
            $this = $(this),
            notEmptyField = !!$this.val();

        if (notEmptyField) {
            isValidpass = true;
        } else {
            $this.tooltip({
                content: 'Введите пароль',
                position: 'left'
            });

            isValidpass = false;
        }
    });

   

    return ((isValidname && isValidpass) || ( isValidlabel &&
                                             isValidpict &&
                                            isValidurl &&
                                            isValidtext ) || (isValidname &&
                                                              isValidmail &&
                                                              isValidtext ));
}


//tooltip plugin
$.fn.tooltip = function(options) {

    options = {
        position    : options.position || 'right',
        content     : options.content || 'I am tooltip'
    };
    
    var
        markup = '<div class="tooltip tooltip_' + options.position + '"> \
                        <div class="tooltip__inner">' + options.content + '</div> \
                    </div>';

    var
        $this = this,
        body = $('body');

    $this
        .addClass('tooltipstered')
        .attr('data-tooltip-position', options.position);

    body.append(markup);
    
    _positionIt($this, body.find('.tooltip').last(), options.position);

        $(document).on('click', function(){
        $('.tooltip').remove();
        $this.css({'background':'white',
                   'border-color':"#48cbe8"
                  });
        
           if($this.parent().hasClass('modif_par')){
            console.log($this.parent());
            $('.modif_par').css({'background':'white',
                   'border-color':"#48cbe8"
                  });}
        
    });

        $(window).on('resize', function(){

        var
            tooltips = $('.tooltip');

        var
            tooltipsArray = [];

        tooltips.each(function(){
            tooltipsArray.push($(this));
        });

        $('.tooltipstered').each(function(index){
            var
                position = $(this).attr('data-tooltip-position');
           //  console.log(tooltipsArray[2]);
            _positionIt($(this), tooltipsArray[index], position);
        });

    });

//функция _positionIt    //////////////////////////////////
function _positionIt(elem, tooltip, position) {

        //измеряем элемент

        var
            elemWidth   = elem.outerWidth(true),
            elemHeight  = elem.outerHeight(true),
            topEdge     = elem.offset().top,
            bottomEdge  = topEdge + elemHeight,
            leftEdge    = elem.offset().left,
            rightEdge   = leftEdge + elemWidth;

        // измеряем тултип

        var
            tooltipWidth    = tooltip.outerWidth(true),
            tooltipHeight   = tooltip.outerHeight(true),
            leftCentered    = (elemWidth / 2) - (tooltipWidth / 2),
            topCentered     = (elemHeight / 2) - (tooltipHeight / 2);


        var positions = {};

        switch (position) {
            case 'right' :
                positions = {
                    left : rightEdge+4,
                    top : topEdge + topCentered
                };
                break;
            case 'top' :
                positions = {
                    left: leftEdge + leftCentered,
                    top : topEdge - tooltipHeight
                };
                break;
            case 'bottom' :
                positions = {
                    left : leftEdge + leftCentered,
                    top : bottomEdge
                };
                break;
            case 'left' :
                positions = {
                    left : leftEdge - tooltipWidth-5,
                    top : topEdge + topCentered
                };
                break;
           

        }

        tooltip
            .offset(positions)
            .css({
                  'opacity': '1',
                  'z-index':'1000'
              });

        elem
           .css({
                 'background':'#fdd5d2',
                 'border-color':'red'
                    });
    }


};