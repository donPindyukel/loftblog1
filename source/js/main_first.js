$(window).load(function(){
 
 var timeOut = 500;
 var name_block = 'li>a';
 var name_img = 'li>a>img';
 var name_element = '.work-item';

var mod, link;


//анимация элемента добавления в портфолия

$(".add_project").hover(function(){
  
 // $(".add_project>img").css('top','20px');
  $(".add_project>img").css('top','20px').stop().animate({'top':0},500);

},
function(){
  $(".add_project>img").stop().animate({'top':0},500);
});

//функция навешивает событие ховер на элементы страницы портфолио
$('.my_works').on({


   'mouseenter': function (e) {
       var element = $(e.target);
       //console.log(e);
      if (e.target.localName === 'a') {

        $(e.target.firstElementChild).stop(true,true).animate({'opacity':0.5},500);
        $(e.target.lastElementChild).stop(true,true).animate({ 
                       'opacity':1,  
                       'width':100,
                       'height':25,
                        'left':40},500);
      }
      else {

       $(e.target).stop(true,true).animate({'opacity':0.5},500);
        $(e.target.nextElementSibling).stop(true,true).animate({ 
                       'opacity':1,  
                       'width':100,
                       'height':25,
                        'left':40},500);


      }
   
        
    },
    'mouseleave': function (e) {
         
   
        if (e.target.localName === 'a') {

     
        $(e.target.firstElementChild).stop(true,true).animate({'opacity':1},500);
        $(e.target.lastElementChild).stop(true,true).animate({
                     'opacity':0,
                     'width':0,
                       'height':0,
                        'left':80},500);
      }
      else {
 
       $(e.target).stop(true,true).animate({'opacity':1},500);
       $(e.target.nextElementSibling).stop(true,true).animate({
                     'opacity':0,
                     'width':0,
                       'height':0,
                        'left':80},500);
      }
        

      }

}, name_block);


//обработчик file upload
var fileupload = $('#f_upl');
var inpt = fileupload[0].children[2];
var p = fileupload[0].children[1];
console.log($(p)[0].textContent);
var file = $(inpt)[0].value;
console.log(file);
$(inpt).change(function(){
  var text = $(inpt)[0].value;
  text = text.substring(12);
  var p = fileupload[0].children[1];
 $(p).html(text);
 $(p).addClass('bold-clr');
 $(p).removeClass('placehold');

});


});


