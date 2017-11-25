<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'PHPmailer/PHPMailer.php';
require 'PHPmailer/SMTP.php';
$mail = new PHPMailer(); // create a new object

$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->SMTPSecure = 'ssl';

$mail->IsHTML(true);
$mail->Username = "happyloka01@gmail.com";
$mail->Password = "H@ppyL0k@";
$mail->SetFrom("happyloka01@gmail.com");
$mail->Subject = "Test";
$mail->Body = "hello";
$mail->AddAddress("info@happyloka.com");

$mail->Subject = 'User Contacted';
$mail->Body    = '<b>Name</b> :'.$_GET['name'].'<br>'.'<b>Email</b> :'.$_GET['email'].'<br>'.'<b>Message</b> :'.$_GET['message'].'<br>';

if(!$mail->send()) {
	$data = 'Message could not be sent.';
	// .'Mailer Error: ' . $mail->ErrorInfo
	header('Content-Type: application/json');
	echo json_encode($data);
} else {
	$data = 'Message has been sent';
	header('Content-Type: application/json');
	echo json_encode($data);
}
