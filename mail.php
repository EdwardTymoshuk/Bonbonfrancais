<?php

	header("Content-Type: text/html; charset=utf-8");
	
	if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest") {
	
		if(!isset($_POST["firstName"]) || !isset($_POST["email"]) || !isset($_POST["message"])) {

			die();

		}
	
		function send_form($message) {	
			$mail_to = "eduard.tymoshuk@gmail.com";
			$subject = "Лист з контактної форми";
			$headers = "From: Нове повідомлення з сайту bonbonfrancais.online <no-reply@".$_SERVER['HTTP_HOST'].">\r\n";

			mail($mail_to, $subject, $message, $headers);
		}

		$firstName = strip_tags($_POST["firstName"]);
		$email = strip_tags($_POST["email"]); 
		$mess = strip_tags($_POST["message"]); 

		$message = <<<HTML

			<b>Імя</b>: {$firstName}<br>
			<b>E-mail</b>: {$email}<br>
			<b>Текст листа</b>: {$mess}

HTML;

		send_form($message);
		
		echo "Ваше повідомлення успішно надіслано. Я відповім вам у найблищий час. Гарного дня!";

	} else {

		die();

	}

?>