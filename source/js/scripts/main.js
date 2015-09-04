



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

if ($('#error-add').length) {
  popPortfolioAdd.init();
}

if ($('#success-add').length) {
  popPortfolioAdd.init();
}

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
        postFormData($this,function(data) {

         var 
             answerUpl = data.status ? 'ok' : 'not';
            // console.log(answerUpl);
             popPortfolioAdd.open(answerUpl);

        });

  }
});

});

