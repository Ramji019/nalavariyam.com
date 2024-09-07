<?php 

class Model_scraps extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
	}

	public function getScrapsData() 
	{
		$sql = "SELECT * FROM scraps WHERE status = 'Active'";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	public function create($data)
	{
		$create = $this->db->insert('scraps', $data);
		return ($create == true) ? true : false;
	}

	public function edit($data = array(), $id = null)
	{
		$this->db->where('id', $id);
		$update = $this->db->update('service', $data);
		return ($update == true) ? true : false;	
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$delete = $this->db->delete('users');
		return ($delete == true) ? true : false;
	}

	public function countTotalUsers()
	{
		$sql = "SELECT * FROM users WHERE id != ?";
		$query = $this->db->query($sql, array(1));
		return $query->num_rows();
	}
	
	
	 
}