<?php 

class Model_payments extends CI_Model
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
	
	public function send_data_one_all($tablename)
		{
        $this->db->order_by("id", "desc");
		$this->db->limit(1000);
		$query=$this->db->get($tablename);
		return $query->result();

		}
		
			public function send_data_one_alls($tablename)
		{
		$service_status = "Paid";
        $this->db->order_by("id", "desc");
		$this->db->limit(200);
		$this->db->where(service_status,$service_status);
		$query=$this->db->get($tablename);
		return $query->result();

		}
		
public function paymentdelete($id)
	{
		$this->db->where('id', $id);
		$delete = $this->db->delete('payments');
		return ($delete == true) ? true : false;
		$delete_id = $this->db->delete_id();

	}
	
public function paymentdeletes($id)
	{
		$this->db->where('pay_id', $id);
		$delete = $this->db->delete('payment');
		return ($delete == true) ? true : false;
	}
	
		public function countDevAmound()
	{
		$paydate = date('Y-m-d');
		$sql = "SELECT * FROM payments WHERE paydate = '$paydate' and amount != '1'";
		$query = $this->db->query($sql);
		return $query->num_rows();
		
	}
		
	public function create($data)
	{
		$create = $this->db->insert('payments', $data);
		return ($create == true) ? true : false;
	}
	
	public function creates($data = '')
	{
		$create = $this->db->insert('payment', $data);
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
		$delete = $this->db->delete('order_service');
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

	   public function getInPayment($customer_id)
	{
	$this->db->select_sum('amount');
    $this->db->where('to_id',$customer_id);
    $this->db->where('service_status','IN Payment');
	$result = $this->db->get('payment')->row();  
	return $result->amount;
	}


	public function getOutPayment($customer_id)
	{
	$this->db->select_sum('amount');
    $this->db->where('to_id',$customer_id);
    $this->db->where('service_status','Out Payment');
	$result = $this->db->get('payment')->row();  
	return $result->amount;
	}
	
}