<?php
if($_SERVER['REQUEST_METHOD'] == "POST"){
header('Content-Type: application/json');
session_start( session_name('php_for_beginners') );

$login = htmlentities(strip_tags(trim($_POST['login'])), ENT_QUOTES);
$password = md5($_POST['pass']);
$ip = $_SERVER['REMOTE_ADDR'];

require_once "../vendor/autoload.php";
try{
    // подключение к БД
    ORM::configure(array(
        'connection_string' => 'mysql:host=localhost;dbname=portfolio',
        'username' => 'root',
        'password' => ''
    ));

    // SELECT * FROM catalog
   $users = ORM::for_table('user')->where('login',$login)->find_one();
   
    $pass_auth= $users->pass;
    $login_auth = $users->login;
} catch (PDOException $e){
    echo "Авторизация невозможна ". $e->getMessage();
}

/*echo '<br>'.$password;
echo '<br>'.$pass_auth;
echo '<br>'.$login;
echo '<br>'.$ip;*/


if ($login != $login_auth || $password != $pass_auth){
    $_SESSION['message'] = "Пользователя с таими данными нет в базе";
   // header("HTTP/1.1 302 Moved Temporarily");
   // header("Location: ../autorize.php");
    $_SESSION['message'];
 //   echo '<br>'.$pass_auth;
    $result = false;

echo json_encode(array(
	'status' => $result,
));
}
else {
    $_SESSION['message'] = "Вы успешно залогинены";
    $_SESSION['auth'] = true;
   // header("HTTP/1.1 302 Moved Temporarily");
   // header("Location: ../index.php");
   // echo '<br>'.$_SESSION['message'];
    $result = true;

echo json_encode(array(
	'status' => $result,
));
}
} else {
    echo "Не надо ломать мой сайт";
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

