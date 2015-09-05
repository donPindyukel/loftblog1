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
        isValidtext = false;
        


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

    mailType.each(function(){
        var
            $this = $(this),
            regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
            isMail = regExp.test($this.val());

        if (isMail) {
            isValid = true;
        } else {
            $this.tooltip({
                content : 'Неверный e-mail',
                position : 'bottom'
            });
            isValid = false;
        }
    });

    return ((isValidname && isValidpass) || ( isValidlabel &&
                                             isValidpict &&
                                            isValidurl &&
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
                position = $(this).data('tooltip-position');

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
                    left : rightEdge,
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