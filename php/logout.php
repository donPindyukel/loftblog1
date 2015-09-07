<?php


session_start( session_name('php_for_beginners') );

session_unset();
session_destroy();
header("HTTP/1.1 307 Temporary Redirect");
header("Location: ../index.php");
exit;
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

