<?php 

class Model_auth extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
				
			   $this->load->database();
	}

	/* 
		This function checks if the email exists in the database
	*/
	public function check_email($username) 
	{
		if($username) {
			$sql = 'SELECT * FROM users WHERE username = ?';
			$query = $this->db->query($sql, array($username));
			$result = $query->num_rows();
			return ($result == 1) ? true : false;
		}

		return false;
	}

	/* 
		This function checks if the email and password matches with the database
	*/
	public function login($username, $password) {
		if($username && $password) {
			$sql = "SELECT * FROM users WHERE username = ?";
			$query = $this->db->query($sql, array($username));

			if($query->num_rows() == 1) {
				$result = $query->row_array();

				$hash_password = password_verify($password, $result['password']);
				if($hash_password === true) {
					return $result;	
				}
				else {
					return false;
				}

				
			}
			else {
				return false;
			}
		}
	}

	public function insert_user($data)
		{
		$insert = $this->db->insert('users', $data);
		if ($insert) {
         return $this->db->insert_id();
		} else {
		return false;
		}
	}
	public function getdistrict() {
		$query = $this->db->get('district');
		return $query->result_array();
	}
	
	   public function change_pwd($data, $id){
			$this->db->where('id', $id);
			$this->db->update('users', $data);
			return true;
		}
		
		public function get_user_detail(){
			$id = $this->session->userdata('id');
			$query = $this->db->get_where('users', array('id' => $id));
			return $result = $query->row_array();
		}

        public function insert_usergroup($data)
		{
		$insert = $this->db->insert('user_group', $data);
		$insert_id = $this->db->insert_id();
		if ($insert_id) {
			
        return $insert_id;
		} else {
		return false;
		}   

          return  $insert_id;
	    }	

            public function update_reset_code($reset_code, $user_id){
			$data = array('resetcode' => $reset_code);
			$this->db->where('id', $user_id);
			$this->db->update('users', $data);
			}	

			 public function check_user_mail($username)
					{
						$result = $this->db->get_where('users', array('username' => $username));

						if($result->num_rows() > 0){
							$result = $result->row_array();
							return $result;
						}
						else {
							return false;
						}
					} 

  public function reset_password($id, $new_password){
	    $data = array(
			'resetcode' => '',
			'password' => $new_password
	    );
		$this->db->where('resetcode', $id);
		$this->db->update('users', $data);
		return true;
    }
	
	
	  public function check_password_reset_code($code)
      {

    	$result = $this->db->get_where('users',  array('resetcode' => $code ));
    	if($result->num_rows() > 0){
    		return true;
    	}
    	else{
    		return false;
    	}
       }
					
}