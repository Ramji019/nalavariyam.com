<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
function sendEmail($to = '', $subject  = '', $body = '', $attachment = '', $cc = '')
    {
	 $controller =& get_instance();     
     $controller->load->helper('path'); 
     $controller->load->library('email');

		$config = array(
			'protocol'  => 'ssl',
			'smtp_host' => 'smtpout.secureserver.net,
			'smtp_port' => 465,
			'smtp_user' => 'info@galaxytechnologypark.com',
			'smtp_pass' => 'nannak123$',
			'mailtype'  => 'html',
			'charset'   => 'utf-8'
		);

$controller->email->initialize($config);
$controller->email->set_mailtype("html");
$controller->email->set_newline("\r\n");
$controller->email->to($to);
$controller->email->from('info@Nalavarayam.com','Nalavarayam');
$controller->email->subject($subject);
$controller->email->message($body);

 if($controller->email->send()){
			return "success";
		}
		else
		{
			echo $controller->email->print_debugger();
		}       
    }	
	

?>