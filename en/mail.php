<?php

	header("Content-Type: text/html; charset=utf-8");
	
	if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest") {
	
		if(!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["message"])) {

			die();

		}
	
		function send_form($message) {
	
			$mail_to = "tetianamirchukk@gmail.com";
			$subject = "Message from contact form";
			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/html; charset=utf-8\r\n";
			$headers .= "From: Система повідомлень <no-reply@".$_SERVER['HTTP_HOST'].">\r\n";

			mail($mail_to, $subject, $message, $headers);
		
		}

		$name = strip_tags($_POST["name"]);
		$email = strip_tags($_POST["email"]); 
		$mess = strip_tags($_POST["message"]); 
		
		if($name == "") {

			echo "Please enter your name.";

			die();

		}

		if(!preg_match("|^([a-z0-9_.-]{1,20})@([a-z0-9.-]{1,20}).([a-z]{2,4})|is", strtolower($email))) { 

			echo "Please enter your e-mail.";

			die();

		}

		if($mess == "") { 

			echo "Please enter your message.";

			die();

		}


		$message = <<<HTML

			<b>Name</b>: {$name}<br>
			<b>E-mail</b>: {$email}<br>
			<b>Message</b>: {$mess}

HTML;

		send_form($message);
		
		echo "Your message was sent successfully. I will reply to you soon. Have a good day!";

	} else {

		die();

	}

?>
