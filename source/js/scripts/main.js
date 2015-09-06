



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

});

