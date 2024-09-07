<?php 

class Model_districts extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
	}

		public function send_data_one($tablename,$filed,$value)
		{
		$this->db->where($filed,$value);
		$query=$this->db->get($tablename);
		return $query->result();
		}
		
	public function getDistrictsData($id = null) 
	{
		if($id) {
			$sql = "SELECT * FROM district WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			return $query->row_array();
		}

		$sql = "SELECT * FROM district";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	public function getActiveDistrictsData() 
	{
		$sql = "SELECT * FROM district WHERE status = ?";
		$query = $this->db->query($sql, array(1));
		return $query->result_array();
		
	}
	
	public function create($data = '')
	{
		$create = $this->db->insert('district', $data);
		return ($create == true) ? true : false;
	}
	
	public function talukcreate($data = '')
	{
		$create = $this->db->insert('taluk', $data);
		return ($create == true) ? true : false;
	}

	public function panchayathcreate($data = '')
	{
		$create = $this->db->insert('panchayath', $data);
		return ($create == true) ? true : false;
	}
	
	public function edit($data, $id)
	{
		$this->db->where('id', $id);
		$update = $this->db->update('district', $data);
		return ($update == true) ? true : false;	
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$delete = $this->db->delete(district);
		return ($delete == true) ? true : false;
	}

	public function getServiceFile($distID) 
	{
		if($distID) {
			$sql = "SELECT * FROM district WHERE id = ?";
			$query = $this->db->query($sql, array($distID));
			$result = $query->row_array();

			return $result;
		}
	}
	
		public function gettaluk($id) 
	{
		if($id) {
			$sql = "SELECT * FROM taluk WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			$result = $query->row_array();

			return $result;
		}
	}


	// Pazhani

	public function update($tble,$data,$field,$value){
		$this->db->where($field,$value);
	 $this->db->update($tble,$data);
	 return true;
	 }

}