<?php
session_start( session_name('php_for_beginners') );
$message = null;
$auth = null;
?>




<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Сайт портфолио</title>
        <meta name="description" content="">
        <meta name="viewport" content="width==device-width, height=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

      <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">
         <link rel="stylesheet" href="css/style.css">

      <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body>
    
        <div class="content-page">
          <div class="autorize-form-wraper">
	<h3 class="title-form">
			Авторизуйтесь
			</h3>
			<form action="/php/action.php" class="autorize" method="POST" id="form_auth">
				<div class="login-field">
                                     <!--<?=$_SESSION['auth'];?>-->
					<p>Логин</p>
					<input type="text" name="login" placeholder = "Введите логин" data-validation="name">
				</div>
				<div class="pass-field">
					<p>Пароль</p>
					<input type="password" name="pass" placeholder = "Введите пароль" data-validation="pass">
				</div>
				<div class="button-form">
					<input type="submit" value="Войти">
				</div>
			</form>
</div>
            <div class="popup" id="success">
	        <div class="popup__overlay"></div>
	        <div class="popup__content">
		        <div class="popup__content-inner">
			        Вы авторизованы!
		        </div>
		        <a class="popup__close" href="#"></a>
	        </div>
        </div>

        <div class="popup" id="error">
	        <div class="popup__overlay"></div>
	        <div class="popup__content">
		        <div class="popup__content-inner">
			       <span class="error">
				   Авторизация не прошла!
			       </span>
		        </div>
		        <a class="popup__close" href="#"></a>
	        </div>
        </div>
        
</div>

        <footer><div class="footer-wraper"><a href="autorize.php" class="lock off_image"></a>
<p class="copyright">(c)2015. Это мой сайт, пожалуйста, не копируйте и не воруйте его</p></div>

</footer>


        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.js"><\/script>')</script>


        <script src="js/main.js"></script>
    </body>
</html>