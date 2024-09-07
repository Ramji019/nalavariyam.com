<?php 

class Model_export extends CI_Model
{
	private $_countryID;
    private $_stateID;
	public function __construct()
	{
		parent::__construct();
	}
	function getUserDetails(){
 		$response = array();
		$this->db->select('id,full_name,full_name_tamil');
		$q = $this->db->get('users');
		$response = $q->result_array();
	 	return $response;
	}
	
}
