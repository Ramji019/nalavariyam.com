<?php 

class Model_service extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
	}

	public function send_data_row($tablename,$filed,$value)
	{
	$this->db->where($filed,$value);
	$query=$this->db->get($tablename);
	return $query->row_array();
	}
	
	public function getUserData($userId = null) 
	{
		$sql = "SELECT * FROM service WHERE status = 'Active'";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	public function getBulkServiceData() 
	{
		$sql = "SELECT * FROM bulk_service";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	
		public function getServiceOderData($id = null) 
	{
	  $order_id =$this->uri->segment(4);
		if($id) {
	   $status ='Completed';
	   $this->db->select("order_service.*,bulk_service.service_name");
	   $this->db->from("order_service");
	   $this->db->join("bulk_service", "order_service.service_id=bulk_service.id");
       $this->db->where('order_service.user_id',$id);
       $this->db->where('order_service.status',$status);
       $this->db->where('order_service.order_id',$order_id);
	   $qry = $this->db->get();
	   $res= $qry->result_array();
	   return $res;
		}
	   $status ='Pending';
	   $user_id = $this->session->userdata('id');
	   $this->db->select("order_service.*,bulk_service.service_name");
	   $this->db->from("order_service");
	   $this->db->join("bulk_service", "order_service.service_id=bulk_service.id");
       $this->db->where('order_service.user_id',$user_id);
       $this->db->where('order_service.status',$status);
       $this->db->where('order_service.order_id',$order_id);
	   $qry = $this->db->get();
	   $res= $qry->result_array();
	   return $res;
		
	}


	
		public function getBullkOderData($id = null)
	{	

	   $status ='Pending';
	   $dist_id = $this->session->userdata('dist_id');
	   $user_id = $this->session->userdata('id');
	   $this->db->select("confirm_order.*,users.full_name");
	   $this->db->from("confirm_order");
	   $this->db->join("users", "confirm_order.log_id=users.id");
       $this->db->where('confirm_order.status',$status);
       $this->db->where('confirm_order.dist_id',$dist_id);
	   $qry = $this->db->get();
	   $res= $qry->result_array();
	   return $res;
	}	
	

	
	   public function ordersum()
	{
	$status ='Pending';
	$user_id = $this->session->userdata('id');
	$this->db->select_sum('sum_pr_payment');
    $this->db->where('user_id',$user_id);
    $this->db->where('status',$status);
	$result = $this->db->get('order_service')->row();  
	return $result->sum_pr_payment;
	}

	public function countOrder()
	{
	    $status ='Pending';
	    $user_id = $this->session->userdata('id');
		$sql = "SELECT * FROM order_service WHERE status = '$status' and user_id= '$user_id'";
		$query = $this->db->query($sql);
		return $query->num_rows();
	}
	
	public function getServiceData() 
	{
		$sql = "SELECT * FROM service WHERE status = 'Active'";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	public function getServiceFile($Id = null) 
	{
		if($Id) {
			$sql = "SELECT * FROM service WHERE id = ?";
			$query = $this->db->query($sql, array($Id));
			$result = $query->row_array();

			return $result;
		}
	}

	public function getGroupData($Id) 
	{
		if($Id) {
	{
			$sql = "SELECT * FROM groups_list WHERE `id` = ?";
			$query = $this->db->query($sql, array($Id));
			$result = $query->row_array();

			return $result;
		}

	   }
	}
public function createorder($data)
	{
		$create = $this->db->insert('order_service', $data);
		return ($create == true) ? true : false;
	}

	public function create($data)
	{
		$create = $this->db->insert('service', $data);
		return ($create == true) ? true : false;
	}
	public function creates($data = '')
	{
		$create = $this->db->insert('payments', $data);
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
		$delete = $this->db->delete('service');
		return ($delete == true) ? true : false;
	}

	public function countTotalUsers()
	{
		$sql = "SELECT * FROM users WHERE id != ?";
		$query = $this->db->query($sql, array(1));
		return $query->num_rows();
	}
	
	// Pazhani

	public function update($tble,$data,$field,$value){
		$this->db->where($field,$value);
	 $this->db->update($tble,$data);
	 return true;
	 }
	 
	 	
	 public function display_records($tablename,$filed,$value)
    {
	$this->db->where($filed,$value);
    $query=$this->db->get($tablename);
    return $query->result();
    }

}

 