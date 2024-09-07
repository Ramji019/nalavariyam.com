<?php
class Mailer 
{
	function __construct()
	{
		$this->CI =& get_instance();
	}
	

	//=============================================================
	function pwd_reset_link($name, $reset_link)
	{
		$tpl = '<h3>Hi ' .strtoupper($name).'</h3>
            <p>Welcome to app!</p>
            <p>We have received a request to reset your password. If you did not initiate this request, you can simply ignore this message and no action will be taken.</p> 
            <p>To reset your password, please click the link below:</p> 
            <p>'.$reset_link.'</p>

            <br>
            <br> ';

          
   
		return $tpl;		
	}

	

}
?>