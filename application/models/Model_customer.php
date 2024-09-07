<?php 

class Model_customer extends CI_Model
{
	private $_countryID;
    private $_stateID;
	public function __construct()
	{
		parent::__construct();
	}
	
    public function viewdistrictusers()
    {
	   $group_id =  $this->uri->segment(3);
	   $this->db->select("users.*,district.district_name");
	   $this->db->from("users");
	   $this->db->join("district", "users.dist_id=district.id");
       $this->db->where('users.group_id',$group_id);
	   $query = $this->db->get();
	   return $query->result_array();

   }

		public function send_data_one($tablename,$filed,$value)
		{
		$this->db->where($filed,$value);
        $this->db->order_by("id", "desc");
		$query=$this->db->get($tablename);
		return $query->result();

		}
		

public function send_data($tablename)
		{
		$query=$this->db->get($tablename);
		return $query->result();
		}

		public function send_data_ones($tablename,$filed,$value)
		{
		$this->db->limit(2);
		$this->db->where($filed,$value);
		$query=$this->db->get($tablename);
		return $query->result();
		}
		
		public function send_data_row($tablename,$filed,$value)
		{
		$this->db->where($filed,$value);
		$query=$this->db->get($tablename);
		return $query->row_array();

		}
		
	public function send_data_two($tablename,$filed,$value,$filed1,$value1)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
    $query=$this->db->get($tablename);
    return $query->result();
    }
	
		public function send_data_thre($tablename,$filed,$value,$filed1,$value1,$filed2,$value2)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
    $this->db->where($filed2,$value2);
    $query=$this->db->get($tablename);
    return $query->result();
    }
	
	    public function getUserWorkData()
    {
	   $customer_id =  $this->uri->segment(3);
	   $this->db->select("users.*,work_one.work_one_name,work_two.work_two_name,work_there.work_there_name");
	   $this->db->from("users");
	   $this->db->join("work_one", "users.work_one_id=work_one.id");
	   $this->db->join("work_two", "users.work_two_id=work_two.id");
	   $this->db->join("work_there", "users.work_there_id=work_there.id");
       $this->db->where('users.id',$customer_id);
	   $query = $this->db->get();
	   return $query->row_array();
   }
   
	public function getUserData($userId = null) 
	{
		if($userId) {
		$referral_id = $this->session->userdata('id');
			$sql = "SELECT * FROM users WHERE id = ? and referral_id = '$referral_id'";
			$query = $this->db->query($sql, array($userId));
			return $query->row_array();
		}
		$sql = "SELECT * FROM users WHERE group_id = ?";
		$query = $this->db->query($sql, array('2'));
		return $query->result_array();
	}

	public function getWorkOne() {
		$query = $this->db->get('work_one');
		return $query->result_array();
	}
	
	public function getWorkTwo($parent = 0) 
	{ 
	       $where = '';
		   if($parent > 0){
			   $where = " and parent = $parent ";
		   }
			$sql = "SELECT * FROM work_two WHERE status = 1 $where";
			$query = $this->db->query($sql);
			return $query->result_array();
	}
	
	public function getWorkThere($parent = 0) 
	{
		    $where = '';
		   if($parent > 0){
			   $where = " and parent = $parent ";
		   }
			$sql = "SELECT * FROM work_there WHERE status = 1 $where";
			//echo $sql;
			$query = $this->db->query($sql);
			return $query->result_array();
	}


	public function getdistrict() {
		$query = $this->db->get('district');
		return $query->result_array();
	}
	
	public function getTaluk($parent = 0) 
	{ 

	       $where = '';
		   if($parent > 0){
			   $where = " and parent = $parent ";
		   }
		   
			$sql = "SELECT * FROM taluk WHERE status = 1 $where";
			$query = $this->db->query($sql);
			return $query->result_array();
	}
	
	public function getPanchayath($parent = 0) 
	{
		    $where = '';
		   if($parent > 0){
			   $where = " and parent = $parent ";
		   }
			$sql = "SELECT * FROM panchayath WHERE status = 1 $where";
			//echo $sql;
			$query = $this->db->query($sql);
			return $query->result_array();
	}













	
		public function getPublicsData() 
	{
		$sql = "SELECT * FROM users WHERE id != ?";
		$query = $this->db->query($sql, array('1'));
		return $query->result_array();
		
	}


	public function getfamilyData($userId = null) 
	{
		if($userId) {
			$sql = "SELECT * FROM family_member WHERE id = ?";
			$query = $this->db->query($sql, array($userId));
			return $query->row_array();
		}
	}
	
	public function getCenterData() 
	{
		$logID = $this->session->userdata('id');
		$groupId = ('3');
		$sql = "SELECT * FROM users WHERE log_id = ? AND group_id = ?";
		$query = $this->db->query($sql, array($logID,$groupId));
		return $query->result_array();
		
	}

		public function getAdminCustomerData() 
	{
		$logID = $this->session->userdata('id');
		$sql = "SELECT * FROM users WHERE log_id = ? and status ='Active' ";
		$query = $this->db->query($sql, array($logID));
		return $query->result_array();
	}
	
	public function getCustomerData($userId = null) 
	{
		if($userId) {
		$sql = "SELECT * FROM users 
		INNER JOIN district ON district.id = users.dist_id 
		WHERE users.id = ?";
		$query = $this->db->query($sql, array($userId));
		return $query->row_array();

		}

		$sql = "SELECT * FROM users WHERE group_id = ?";
		$query = $this->db->query($sql, array('4'));
		return $query->result_array();
		
	}
	
		public function getCustomerWorkData($userId = null) 
	{
		if($userId) {
		$sql = "SELECT * FROM users 
		INNER JOIN work_one ON work_one.id = users.work_one_id  
		INNER JOIN work_two ON work_two.id = users.work_two_id  
		INNER JOIN work_there ON work_there.id = users.work_there_id  
		WHERE users.id = ?";
		$query = $this->db->query($sql, array($userId));
		return $query->row_array();
	    }	
	}

	public function getCustomerFamilyData($userId = null) 
	{
					   //print_r($userId);die;

		if($userId) {
		$sql = "SELECT * FROM family_member 
		INNER JOIN users ON users.id = family_member.customer_id  
		WHERE family_member.id = ?";
		$query = $this->db->query($sql, array($userId));
		return $query->row_array();
	    }	
	}	
	public function getUserGroup($userId = null) 
	{
		if($userId) {
			$sql = "SELECT * FROM user_group WHERE user_id = ?";
			$query = $this->db->query($sql, array($userId));
			$result = $query->row_array();
			
			$group_id = $result['group_id'];
			$g_sql = "SELECT * from groups_list WHERE id = ?";
			$g_query = $this->db->query($g_sql, array($group_id));
			$q_result = $g_query->row_array();
			return $q_result;
		}
	}
	public function getGroupUsers($userId = null) 
	{
		if($userId) {
			$sql = "SELECT * FROM user_group WHERE user_id = ?";
			$query = $this->db->query($sql, array($userId));
			$result = $query->row_array();
		
		}
	}
	
	public function create($data = '', $group_id = null)
	{
		if($data && $group_id) {
			$create = $this->db->insert('users', $data);

			$user_id = $this->db->insert_id();

			$group_data = array(
				'user_id' => $user_id,
				'group_id' => $group_id
			);

			$group_data = $this->db->insert('user_group', $group_data);

			return ($create == true && $group_data) ? true : false;
		}
	}

	public function edit($data = array(), $id = null, $group_id = null)
	{
		$this->db->where('id', $id);
		$update = $this->db->update('users', $data);

		if($group_id) {
			// user group
			$update_user_group = array('group_id' => $group_id);
			$this->db->where('user_id', $id);
			$user_group = $this->db->update('user_group', $update_user_group);
			return ($update == true && $user_group == true) ? true : false;	
		}
			
		return ($update == true) ? true : false;	
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$delete = $this->db->delete('users');
		return ($delete == true) ? true : false;
	}
	
		public function createinfo($data = '')
	{
		$create = $this->db->insert('customer_info', $data);
		return ($create == true) ? true : false;
	}
	
//superadmin

	public function countTotalUsers()
	{
		$sql = "SELECT * FROM users WHERE status = ?";
		$query = $this->db->query($sql, array('Active'));
		return $query->num_rows();
	}
	
		public function countTotalAdmin($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
	public function countPublicData()
	{
		$sql = "SELECT * FROM users WHERE group_id != '2'";
	    $query = $this->db->query($sql);
		return $query->num_rows();
	}
	
	public function countTotalDistUsers($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
///Admin
		public function countAdminUsers($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
	public function countCenterUsers($tablename,$filed,$value,$filed1,$value1)
	{
     $this->db->where($filed,$value);
     $this->db->where($filed1,$value1);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}

	public function countCenterPublic($tablename,$filed,$value,$filed1,$value1)
	{
     $this->db->where($filed,$value);
     $this->db->where($filed1,$value1);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
	public function countAdminPayments($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
//
	public function countPublicUsers($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	public function countActivePublic($tablename,$filed,$value,$filed1,$value1)
	{
     $this->db->where($filed,$value);
     $this->db->where($filed1,$value1);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
    public function countTotalFollow($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
	public function countTotalFollows($tablename,$filed,$value,$filed1,$value1)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	

	
		public function countTotalCenter($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	public function countTotalPayments($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}

	public function countDubil($tablename,$filed,$value,$filed1,$value1)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
	

	
	
	public function update($tble,$data,$field,$value){
	$this->db->where($field,$value);
	 $this->db->update($tble,$data);
	 return true;
	 
	 }

	 public function updates($tble,$update_data,$field,$value){
	 $this->db->where($field,$value);
	 $this->db->update($tble,$update_data);
	 return true;
	 }
	
	
    public function family_data($tablename,$filed,$value)
    {
	$this->db->where($filed,$value);
    $query=$this->db->get($tablename);
    return $query->result();
    }


	
    public function create_family($data = '')
	{
		$create = $this->db->insert('family_member', $data);
		return ($create == true) ? true : false;
	}
     
	 public function create_bank_details($data = '')
	{
		$create = $this->db->insert('users', $data);
		return ($create == true) ? true : false;
	}
	
	
	
	
	
	
	
	
	//dasbode
	
	
	
	public function countUser($tablename,$filed,$value)
	{
     $this->db->where($filed,$value);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
	public function countUsers($tablename,$filed,$value,$filed1,$value1)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
	 if ($query = $this->db->get($tablename))
	{
		return $query->num_rows();
	}
	else
	{
    echo "Query failed!";
	}
	}
	
}
