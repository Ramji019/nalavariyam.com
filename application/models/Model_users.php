<?php 

class Model_users extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}
	

public function create_posting($data = '')
	{
		$create = $this->db->insert('users_posting', $data);
		return ($create == true) ? true : false;
	}
}
