<?php

//header('Content-Type: application/json');
use \WideImage\WideImage as WideImage;
if($_SERVER['REQUEST_METHOD'] == "POST"){
session_start(session_name('php_for_beginners'));
//

require_once "../vendor/autoload.php";
$i=0;

// Получаем доступ к файлу
    $file = $_FILES['upl'];
  
     if($file['size'] == 0 || $file['size'] > 10097152){
      //  $_SESSION['message'] = "Файл не выбран или превышает 10МБ";
       // header("HTTP/1.1 302 Moved Temporarily");
      //  header("Location: index.php");s
        $result = false;
        if (!$result) {
         
            echo json_encode(array(
	'status' => $result
  )); exit;}
      
    }
    
     $file_name = $file['name'];
     $file_dist = dirname(__DIR__).'\img\\'.$file_name;
    // echo $file['name'];
  //  echo $file_dist;
     
     if(move_uploaded_file($file['tmp_name'], $file_dist)){
   //     $_SESSION['message'] = "Файл успешно загружен на сервер<br /><a href='/example-3/uploads/{$file_name}'>{$file_name}</a>";
       // header("HTTP/1.1 302 Moved Temporarily");
     //   header("Location: .php");
         $result = true;


    } else {
    //    $_SESSION['message'] = "Возникла ошибка при загрузке файла на сервер";
      //  header("HTTP/1.1 302 Moved Temporarily");
       // header("Location: index.php");
        $result = false;
     //   $result = false;
        if (!$result) {
            
            echo json_encode(array(
	'status' => $result
  )); exit;}

    }

    
    $image = WideImage::loadFromFile($file_dist);
    $resized=$image->resize('181','127','inside');
    $resized->saveToFile(dirname(__DIR__).'\img\\'.$file_name);
try{
    // подключение к БД
    ORM::configure(array(
        'connection_string' => 'mysql:host=localhost;dbname=portfolio',
        'username' => 'root',
        'password' => ''
    ));

    // SELECT * FROM catalogs
    $count = ORM::for_table('sites')->count();
   $sites = ORM::for_table('sites')->create();
    


} catch (PDOException $e){
  //  echo "Возникла ошибка: ". $e->getMessage();
    $result=false;
   // $result = false;
        if (!$result) {
          
            echo json_encode(array(
	'status' => $result
  )); exit;}
}

$name=$_POST['name'];
$url=$_POST['url'];
$discr=$_POST['discription'];
$sites = ORM::for_table('sites')->create();
$sites->id = $count+1;
$sites->name = $url;
$sites->pict = $file_name;
$sites->inf = $name;
$sites->discript = $discr;
$sites->save();
$result=true;

//echo 'dshgdfh';
//header('Content-Type: application/json');*/
//$result=true;
echo json_encode(array(
	'status' => $result
        ));
/*header("HTTP/1.1 302 Moved Temporarily");
    header("Location: ../portfolio.php");*/

} else {
    echo "Не надо ломать мой сайт";
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

