<?php 

class Model_groups extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
	}

	public function getGroupData($groupId = null) 
	{
		if($groupId) {
			$sql = "SELECT * FROM groups_list WHERE `id` = ?";
			$query = $this->db->query($sql, array($groupId));
			return $query->row_array();
		}

		$sql = "SELECT * FROM groups_list WHERE `id` != ?";
		$query = $this->db->query($sql, array(1));
		return $query->result_array();
	}

public function send_data_row($tablename,$filed,$value)
	{
	$this->db->where($filed,$value);
	$query=$this->db->get($tablename);
	return $query->row_array();
	}

	public function getUserGroup($userId = null) 
	{
		if($userId) {
			$sql = "SELECT * FROM user_group WHERE user_id = ?";
			$query = $this->db->query($sql, array());
			$result = $query->row_array();
			
			$group_id = $result['group_id'];
			$g_sql = "SELECT * FROM groups_list WHERE `id` = ?";
			$g_query = $this->db->query($g_sql, array($group_id));
			$q_result = $g_query->row_array();
			return $q_result;
		}
	}
	
	public function create($data = '')
	{
		$create = $this->db->insert(groups_list, $data);
		return ($create == true) ? true : false;
	}

	public function edit($data, $id)
	{
		$this->db->where('id', $id);
		$update = $this->db->update('groups_list', $data);
		return ($update == true) ? true : false;	
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$delete = $this->db->delete(groups_list);
		return ($delete == true) ? true : false;
	}

	public function existInUserGroup($id)
	{
		$sql = "SELECT * FROM user_group WHERE group_id = ?";
		$query = $this->db->query($sql, array($id));
		return ($query->num_rows() == 1) ? true : false;
	}

	public function getUserGroupByUserId($user_id) 
	{
		$sql = "SELECT * 
  FROM `user_group` INNER JOIN groups_list ON groups_list.`id` = `user_group`.`group_id`
 WHERE `user_group`.`user_id` =  ?";
		$query = $this->db->query($sql, array($user_id));
		$result = $query->row_array();

		return $result;

	}

}