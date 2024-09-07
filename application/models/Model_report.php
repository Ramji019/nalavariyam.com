<?php 

class Model_report extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
	}

	public function send_data_thre($tablename,$filed,$value,$filed1,$value1,$filed2,$value2)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
    $this->db->where($filed2,$value2);
    $query=$this->db->get($tablename);
    return $query->result();
    }
	
	
	public function approve($group_id = null)
    {
		
		
if($this->session->userdata('group_id') == '1'){
	   $service_status ='Pending';
	   $this->db->select("payments.*,district.district_name, users.phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   
} if(($this->session->userdata('group_id') == '2') || ($this->session->userdata('group_id') == '3')){
	   $service_status ='Pending';
	   $this->db->select("payments.*,district.district_name, users.phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$group_id);
       $this->db->where('payments.service_status',$service_status);
	   
} if(($this->session->userdata('group_id') == '4') || ($this->session->userdata('group_id') == '5')){
	   $dist_id = $this->session->userdata('dist_id');
	   $service_status ='Pending';
	   $this->db->select("payments.*,district.district_name, users.phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$group_id);
       $this->db->where('payments.service_status',$service_status);
       $this->db->where('payments.dist_id',$dist_id);
	   
} if(($this->session->userdata('group_id') == '16') || ($this->session->userdata('group_id') == '17')){
	   $dist_id = $this->session->userdata('dist_id');
	   $service_status ='Pending';
	   $this->db->select("payments.*,district.district_name, users.phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$group_id);
       $this->db->where('payments.service_status',$service_status);
}
	   $query=$this->db->get();
	   return $query->result();
}






	public function getData() 
	{
		$sql = "SELECT * FROM payments";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	public function getUser() 
	{
		$sql = "SELECT * FROM users";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	public function getReportsData($id = null) 
	{
		if($id) {
			$sql = "SELECT * FROM payments WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			return $query->row_array();
		}

		$sql = "SELECT * FROM payments WHERE service_status != 'Waiting'";
		$query = $this->db->query($sql);
		return $query->result_array();
		
	}
		public function getReportsDatas($id = null) 
	{
		if($id) {
			$sql = "SELECT * FROM payments WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			return $query->row_array();
		}

		$sql = "SELECT * FROM payments WHERE service_status = 'Paid'";
		$query = $this->db->query($sql);
		return $query->result_array();
		
	}
	
			public function BulkpurchaseDatas($id = null) 
	{
		if($id) {
			$sql = "SELECT * FROM payments WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			return $query->row_array();
		}

		$sql = "SELECT * FROM payments WHERE service_status = 'Bulk'";
		$query = $this->db->query($sql);
		return $query->result_array();
		
	}
	
	
		public function getPaymentsPaid($id = null) 
	{
		if($id) {
			$sql = "SELECT * FROM payments WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			return $query->row_array();
		}

		$sql = "SELECT * FROM payments WHERE service_status = 'Paid'";
		$query = $this->db->query($sql);
		return $query->result_array();
		
	}
	
	public function getAdminPaymentData($dist_id = null) 
	{
		if($dist_id) {
		$sql = "SELECT * FROM payments WHERE dist_id = ?";
		$query = $this->db->query($sql, array($dist_id));
		return $query->result_array();
		
	   }
	   	$sql = "SELECT * FROM payments";
		$query = $this->db->query($sql);
		return $query->result_array();

	}
		
	public function getReportsPendingData($id = null) 
	{
		if($id) {
			$sql = "SELECT * FROM payments WHERE id = ?";
			$query = $this->db->query($sql, array($id));
			return $query->row_array();
		}

		$sql = "SELECT * FROM payments WHERE service_status = 'Active'";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	public function rettanapply($data, $id)
	{
		$this->db->where('id', $id);
		$update = $this->db->update('payments', $data);
		return ($update == true) ? true : false;	
	}

	// Pazhani

	public function update($tble,$data,$field,$value){
		$this->db->where($field,$value);
	 $this->db->update($tble,$data);
	 return true;
	 
    }
	
	 	public function countInactiveData() 
	{
		$sql = "SELECT * FROM payments WHERE service_status = 'Inactive'";
		$query = $this->db->query($sql);
		return $query->num_rows();
	}
	public function countActiveData() 
	{
		$sql = "SELECT * FROM payments WHERE service_status = 'Active'";
		$query = $this->db->query($sql);
		return $query->num_rows();
	}
	
    public function countCenterPayments($tablename,$filed,$value)
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
	
		public function send_data_two($tablename,$filed,$value,$filed1,$value1)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
    $query=$this->db->get($tablename);
    return $query->result();
    }
	
	 public function display_record($tablename,$filed,$value)
    {
	$this->db->where($filed,$value);
    $query=$this->db->get($tablename);
    return $query->result();
    }
	
		public function display_records($tablename,$filed,$value,$filed1,$value1)
    {
	$this->db->where($filed,$value);
    $this->db->where($filed1,$value1);
    $query=$this->db->get($tablename);
    return $query->result();
    }
		public function create($data = '')
	{
		$create = $this->db->insert('payments', $data);
		return ($create == true) ? true : false;
	}

	
	public function pending($customer_group_id = null)
    {
	   $service_status ='Pending';
	   $dist_id = $this->session->userdata('dist_id');
	   $taluk_id = $this->session->userdata('taluk_id');
	   
if($this->session->userdata('group_id') == '1'){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '2') || ($this->session->userdata('group_id') == '3')){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '4') || ($this->session->userdata('group_id') == '5')){

	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '6') || ($this->session->userdata('group_id') == '7')){
	   
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '8') || ($this->session->userdata('group_id') == '9') || ($this->session->userdata('group_id') == '10') || ($this->session->userdata('group_id') == '11') || ($this->session->userdata('group_id') == '12') || ($this->session->userdata('group_id') == '13')){
	   	   $log_id = $this->session->userdata('id');

	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
       $this->db->where('payments.log_id',$log_id);
	   $this->db->order_by("payments.id", "desc");
	   
} if(($this->session->userdata('group_id') == '16') || ($this->session->userdata('group_id') == '17')){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

}
	   $query=$this->db->get();
	   return $query->result();
}

	public function approved($customer_group_id = null)
    {
	   $service_status ='Img';
	   $sql = "";
	   $dist_id = $this->session->userdata('dist_id');
	   $taluk_id = $this->session->userdata('taluk_id');
	   
if($this->session->userdata('group_id') == '1'){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '2') || ($this->session->userdata('group_id') == '3')){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");
	   /*$sql="select a.*,b.district_name,c.full_name,c.phone,d.service_name from payments a,district b,users c,service d were a.dist_id=b.id and a.customer_id=c.id and a.service_id=d.id and a.service_status='Img' order by a.id desc";*/
	   

} if(($this->session->userdata('group_id') == '4') || ($this->session->userdata('group_id') == '5')){

	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '6') || ($this->session->userdata('group_id') == '7')){

	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '8') || ($this->session->userdata('group_id') == '9') || ($this->session->userdata('group_id') == '10') || ($this->session->userdata('group_id') == '11') || ($this->session->userdata('group_id') == '12') || ($this->session->userdata('group_id') == '13')){
	
	   $log_id = $this->session->userdata('id');
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
       $this->db->where('payments.log_id',$log_id);
	   $this->db->order_by("payments.id", "desc");
} if(($this->session->userdata('group_id') == '16') || ($this->session->userdata('group_id') == '17')){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

}
	   /*if(($this->session->userdata('group_id') == '2') || ($this->session->userdata('group_id') == '3')){
		  $query=$this->db->query($sql);
		  return $query->result_array(); 
	   }else{*/
		  $query=$this->db->get();
		  return $query->result(); 
	   //}		   
	   
}


	public function rejected($customer_group_id = null)
    {
	   $service_status ='Rejected';
	   $dist_id = $this->session->userdata('dist_id');
	   $taluk_id = $this->session->userdata('taluk_id');
	   
if($this->session->userdata('group_id') == '1'){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '2') || ($this->session->userdata('group_id') == '3')){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$customer_group_id);
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '4') || ($this->session->userdata('group_id') == '5')){

	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$customer_group_id);
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '6') || ($this->session->userdata('group_id') == '7')){

	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$customer_group_id);
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

} if(($this->session->userdata('group_id') == '8') || ($this->session->userdata('group_id') == '9') || ($this->session->userdata('group_id') == '10') || ($this->session->userdata('group_id') == '11') || ($this->session->userdata('group_id') == '12') || ($this->session->userdata('group_id') == '13')){

	   $log_id = $this->session->userdata('id');
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.customer_group_id',$customer_group_id);
	   $this->db->where('payments.service_status',$service_status);
       $this->db->where('payments.log_id',$log_id);
	   $this->db->order_by("payments.id", "desc");
} if(($this->session->userdata('group_id') == '16') || ($this->session->userdata('group_id') == '17')){
	   $this->db->select("payments.*,district.district_name, users.full_name,phone, service.service_name");
	   $this->db->from("payments");
	   $this->db->join("district", "payments.dist_id=district.id");
	   $this->db->join("users", "payments.log_id=users.id");
	   $this->db->join("service", "payments.service_id=service.id");
       $this->db->where('payments.service_status',$service_status);
	   $this->db->order_by("payments.id", "desc");

}
	   $query=$this->db->get();
	   return $query->result();
}
}