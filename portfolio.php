<?php
session_start(session_name('php_for_beginners'));

require_once "vendor/autoload.php";
$i=1;
try{
    // подключение к БД
    ORM::configure(array(
        'connection_string' => 'mysql:host=localhost;dbname=portfolio',
        'username' => 'root',
        'password' => ''
    ));

    // SELECT * FROM catalogs
    $sites = ORM::for_table('sites')->find_many();

    


} catch (PDOException $e){
    echo "Возникла ошибка: ". $e->getMessage();
}

        
?>
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Сайт портфолио</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

      <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">
         <link rel="stylesheet" href="css/style.css">

      <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
   
    <body>

    <div class="black-wraper" id="back"></div>
        <header><div class="content-wraper clearfix">
	<div class="vertical-center-left">
	<a class="logo" href="index.html">
		<img src="img/logo.png" alt="Loftblog">
		<span class="logo-text">Сайт портфолио</span>
	</a>
	</div>
	<div class="vertical-center-right">
	<ul class="social-buttons">
		<li class="social-item-1">
			<a href="vk.com" class="vk">Vk</a>
		</li>
		<li class="social-item-2">
			<a href="twitter.com" class="tw">Twitter</a>
		</li>
		<li class="social-item-3">
			<a href="facebook.com" class="fc">Facebook</a>
		</li>
		<li class="social-item-4">
			<a href="git.com" class="git">git</a>
		</li>
	</ul>
	</div>
	

</div></header>
     
        <section>
            <aside><div class="sidebar">
<ul class="main-menu">
	<li class="menu-item-1 none"><a href="index.php" class="about-me">Обо мне</a></li>
	<li class="menu-item-2  current"><a href="portfolio.php" class="portfolio">Мои работы</a></li>
	<li class="menu-item-3 none"><a href="form-contacts.php" class="form-contacts ">Связаться со мной</a></li>
</ul>
<ul class="sidebar-contacts">
    <li class="contacts-item-1"><p>Контакты</p></li>
	<li class="contacts-item-2"><a href="mailto:a913000@gmail.com" class="email">a913000@gmail.com</a></li>
	<li class="contacts-item-3"><a href="tel:+79163196899" class="phone">+7 916 391 3000</a></li>
	<li class="contacts-item-4"><a href="skype:pin913" class="skype">pin913</a></li>
</ul>	
</div>	</aside>
            <article>
               <div class="portfolio-wraper">
	<h1 class="portfolio-title">Мои работы</h1>
	<ul class="my_works" id="my_works">
            <?php foreach ($sites as $item):?>
		<li class="work-item-<?=$i;?> work-item">
			<a href="<?=$item->name;?>" class="site<?=$i?>">
					<img src="img/<?php echo $item->pict;?>" alt="">
				<div class="name-hover-<?=$i?> name-hover"><?php echo $item->name; ?></div>
			
				</a>

			<p>
				<span><?php echo $item->name; ?></span>
                                <i><?php echo $item->inf; ?></i><br> <?php echo $item->discript; ?>
			</p>
        
		</li>
                <?php   $i++;             endforeach;?>
		
                <?php if ( $_SESSION['auth'] == true) : ?>
		<li class="work-item-<?=$i;?> add-work-item">
		<div class="add_project" id="add_prj" >
			<img src="/img/add.png"  alt="">
			<p>Добавить проект</p>

		</div>
		</li>
                <?php endif; ?>
	</ul>
</div>
<!--<div class="hover-link"><div class="name-hover">название</div></div>-->

 
            </article>

        </section>

        <footer><div class="footer-wraper"><a href="autorize.php" class="lock"></a>
<p class="copyright">(c)2015. Это мой сайт, пожалуйста, не копируйте и не воруйте его</p></div>

</footer>

        <div class="mod-form_add_project" id="mod-form_add">
	<form action="php/add_project.php" class="add_project" enctype="multipart/form-data" method="POST" id="mod-form-add-prj">
		<h3 class="title-form">
			<div class="close-mod-form" id="close"></div>
			Добавление проекта
		</h3>
            <div class="error-add-prj" id="error-add">
			<p class="msg-error"><span>Ошибка!</span>Невозможно добавить проект.</p>
			<div class="close-error-pict"></div>
		</div>
		<div class="name-field-1">
			<h4 class="title-name_project">Название проекта</h4>
			<input type="text" class="form-name_project" name="name" placeholder="Введите название" data-validation="label"></div>
		<div class="name-field-2">
			<h4 class="title-pict_project">Картинка проекта</h4>
			<label class="file_upload" id="f_upl" >
				<div class="button"></div>
				<p class="placehold">Загрузите изображение</p>
				<input type="file"  class="form-pict_project" accept="image/*"  name="upl" data-validation="pict"></label>
		</div>
		<div class="name-field-3">
			<h4 class="title-url_project">URL проекта</h4>
			<input type="text" class="form-url_project" name="url" placeholder="Добавьте ссылку" data-validation="url_prj"></div>
		<div class="name-field-4">
			<h4 class="title-descript_project">Описание</h4>
			<textarea class="form-descript_project" name="discription" placeholder="Пара слов о Вашем проекте" data-validation="text"></textarea>
		</div>
		<div class="name-field-5">
			<input type="submit" class="form-submit_project" value="Добавить"></div>

	</form>
</div>
     <div class="success-wrap" id="success-add">
<div class="success-add-prj">
			<p class="msg-success"><span>Ура!</span>Проект успешно добавлен.</p>
			<div class="close-success-pict"></div>
		</div></div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.js"><\/script>')</script>


        <script src="js/main.js"></script>
    </body>  

</html>
