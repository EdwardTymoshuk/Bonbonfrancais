<?php

	header("Content-Type: text/html; charset=utf-8");
	
	if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest") {
	
		if(!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["message"])) {

			die();

		}
	
		function send_form($message) {
	
			$mail_to = "eduard.tymoshuk@gmail.com";
			$subject = "Лист з контактної форми";
			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/html; charset=utf-8\r\n";
			$headers .= "From: Система повідомлень <no-reply@".$_SERVER['HTTP_HOST'].">\r\n";

			mail($mail_to, $subject, $message, $headers);
		
		}

		$name = strip_tags($_POST["name"]);
		$email = strip_tags($_POST["email"]); 
		$mess = strip_tags($_POST["message"]); 
		
		if($name == "") {

			echo "Вкажіть будь ласка ім'я.";

			die();

		}

		if(!preg_match("|^([a-z0-9_.-]{1,20})@([a-z0-9.-]{1,20}).([a-z]{2,4})|is", strtolower($email))) { 

			echo "Вкажіть або перевірте E-mail.";

			die();

		}

		if($mess == "") { 

			echo "Вкажіть будь ласка текст повідомлення.";

			die();

		}


		$message = <<<HTML

			<b>Ім'я</b>: {$name}<br>
			<b>E-mail</b>: {$email}<br>
			<b>Текст письма</b>: {$mess}

HTML;

		send_form($message);
		
		echo "Ваше повідомлення успішно надіслано. Я відповім вам у найблищий час. Гарного дня!";

	} else {

		die();

	}

?>
