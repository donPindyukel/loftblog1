<?php
//header('Content-Type: application/json');
session_start( session_name('php_for_beginners') );
require_once 'data.php';
require_once "../vendor/autoload.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
$result = true;

$captcha = $_POST['g-recaptcha-response'];
$ip = $_SERVER['REMOTE_ADDR'];
if(!check_captcha($sekret_key,$captcha, $ip)) {
    //redirect('Вы не прошли проверку');
     $result = false;
      
            echo json_encode(array(
	'status' => $result  
                    ));
            exit;
}

//if ($result) {
         
//            echo json_encode(array(
//	'status' => $result
//  )); 
            //exit;
          //  echo 'hi';
//}

// если был сделан пост запрос


    $name = clear_data_str($_POST['name']);
    $mail = clear_data_str($_POST['mail']);
    $message  = clear_data_str($_POST['msg']);

    // если есть пустые поля
//    if(empty($name) || empty($mail) || empty($message)){
        //echo "Заполните все поля";
//          redirect('Заполните все поля');
//        exit;
//    }


    // Если файл был отправлен
    if(send_message_to_email(array(
        'name' => $name,
        'mail' => $mail,
        'message'   => $message
    ))){
        
        //redirect('Ваше сообщение успешно отправлено');
        $result = true;
         
    } else {
       
        //echo "Ошибка при отправке сообщения";
       // redirect('Ошибка при отправке сообщения');
        $result = false;
        exit;
    }

echo json_encode(array(
	'status' => $result  
                    ));
} else {
    echo "Не надо ломать мой сайт";
}
///////////////////////////////////////////////////////////////////////////

function send_message_to_email($data){

    $mail = new PHPMailer;
    $mail->isSendmail();
    // Указываем отправителя письма
    $mail->setFrom('abracatabra@mail.ru', 'Антон Голомазов');
    // Указываем получателя письма
    $mail->addAddress('a913000@gmail.com', "Андрею Пиндюку");
    // Указываем тему письма
    $mail->Subject = "Отправка письма с вебинара";
    // Устанавливаем текст сообщения
    $mail->msgHTML("Тестовое письмо с сайта портфолио от ".$data['mail'].' '.$data['name']);


    return $mail->send();

}

function clear_data_str($data){
    return htmlentities(strip_tags(trim($data)));
}

function redirect($msg){
    $_SESSION['message']=$msg;
    header("HTTP/1.1 302 Moved Temporarily");
    header("Location: ../form-contacts.php");
}

/////////////////////////////////////////////////////////////////////
function check_captcha($key, $catpcha, $ip){

    $url_to_send = "https://www.google.com/recaptcha/api/siteverify?secret=".$key.'&response='.$catpcha.'&ip='.$ip;
    $data_request = file_get_contents($url_to_send);
    $data =  json_decode($data_request, true);

    if(isset($data['success']) && $data['success'] == 1){
        return true;
    } else {
        return false;
    }

}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

