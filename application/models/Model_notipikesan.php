<?php 

class Model_notipikesan extends CI_Model
{
	private $_countryID;
    private $_stateID;
	public function __construct()
	{
		parent::__construct();
	}

		public function send_data($tablename)
		{
        $this->db->order_by("id", "desc");
		$query=$this->db->get($tablename);
		return $query->result();
		}

		public function send_data_one($tablename,$filed,$value)
		{
        $this->db->order_by("id", "desc");
        $this->db->where($filed,$value);
		$query=$this->db->get($tablename);
		return $query->result();
		}

	public function create($data = '', $group_id = null)
	{
			$create = $this->db->insert('notipikesan', $data);
			return ($create == true) ? true : false;
	}
	
	public function update($tble,$data,$field,$value)
	{
	$this->db->where($field,$value);
		$update = $this->db->update('notipikesan', $data);
		return ($update == true) ? true : false;	
	}
	
	public function delete($id)
	{
		$this->db->where('id', $id);
		$delete = $this->db->delete('notipikesan');
		return ($delete == true) ? true : false;
	}
	
	
	
}
