<?php 

class Payments extends Admin_Controller 
{
	public function __construct()
	{
		parent::__construct();

		$this->not_logged_in();
		
		$this->data['page_title'] = 'Payments';
		$this->load->model('model_customer');
		$this->load->model('model_service');
		$this->load->model('model_payment');
		$this->load->model('model_users');
	}

	public function index($customer_id)
	{
		if(!in_array('viewUser', $this->permission)) {
		   redirect('dashboard', 'refresh');
		}
	       $customer_data = $this->model_customer->getCustomerData($customer_id);
	       $this->data['customer_data'] = $customer_data;
		   	$this->data['data'] = $this->model_payment->display_record('payments','customer_id',$customer_id);
           $mainpayment_data = $this->model_payment->getMainPaymentData($customer_id);
	       $this->data['mainpayment_data'] = $mainpayment_data;
		   
		 
		$this->render_templatei('payment/index', $this->data);
	}

	public function projects()
	{
		if(!in_array('viewCustomer', $this->permission)) {
			redirect('dashboard', 'refresh');
		}
		$user_data = $this->model_customer->getCustomerDatas();
		$result = array();
		foreach ($user_data as $k => $v) {
			$result[$k]['user_info'] = $v;
		}
				$this->data['user_data'] = $result;

		$this->render_templates('payment/projects', $this->data);
	}
	
	
	public function invoice($customer_id)
	{
		if(!in_array('viewUser', $this->permission)) {
		   redirect('dashboard', 'refresh');
		}
	       $user_data = $this->model_customer->getCustomerData($customer_id);
		   $service_data = $this->model_service->getServiceDatas($customer_id);
	       $this->data['service_data'] = $service_data;
	       $this->data['user_data'] = $user_data;		
		   $ordersum_row = $this->model_service->ordersum($customer_id);
	       $this->data['ordersum_row'] = $ordersum_row;	
		   $invoiceId = $this->model_payment->getMainPaymentData($customer_id);
	       $this->data['invoiceId'] = $invoiceId;	
		$this->render_templatei('payment/invoice', $this->data);
	}
	
	public function quotation($customer_id)
	{
		if(!in_array('viewUser', $this->permission)) {
		   redirect('dashboard', 'refresh');
		}
	       $ordersum_row = $this->model_service->ordersum($customer_id);
	        	$this->data['ordersum_row'] = $ordersum_row;	
	            $customer_data = $this->model_customer->getcustomerData($customer_id);
	        	$this->data['customer_data'] = $customer_data;
		        $service_data = $this->model_service->getServiceDatas($customer_id);
		        $this->data['service_data'] = $service_data;	
	           $this->data['total_row'] = $this->model_service->countTotalRow('product_order','customer_id',$customer_id);
				
		$this->render_templatei('payment/quotation', $this->data);
	}


				
	public function create($id = null)
	{
		if(!in_array('updateCustomer', $this->permission)) {
			redirect('dashboard', 'refresh');
		}
		 $customer_id =  $this->uri->segment(3);
		if($id) {
			$this->form_validation->set_rules('pay_payment', 'Pay Payment', 'required');
			$this->form_validation->set_rules('new_balance', 'New Balance', 'required');

			if ($this->form_validation->run() == TRUE) {
				// true case
				$data = array(
				'customer_id' => $this->input->post('customer_id'),
        		'total_payment' => $this->input->post('total_payment'),
        		'pay_payment' => $this->input->post('pay_payment'),
        		'new_balance' => $this->input->post('new_balance'),
				'paydate' => $paydate = date('Y-m-d'),
				'log_id' => $this->session->userdata('id')
				);
			//print_r($data);die();

        	    $create = $this->model_payment->create($data);
		     	$last_id = $this->db->insert_id();
				
			$datas = array(
        		'total_payment' => $this->input->post('new_balance'),
				'log_id' => $this->session->userdata('id')
				);
							//print_r($datas);die();
	        	$update = $this->model_payment->edit($datas, $id);
	        	if($create == true) {
	        		$this->session->set_flashdata('success', 'Successfully updated');
	        		redirect('payments/receipt/'.$last_id, 'refresh');
	        	}
	        	else {
	        		$this->session->set_flashdata('errors', 'Error occurred!!');
	        		redirect('payment/create/'.$id, 'refresh');
	        	}
	        }

	        else {
	            $user_data = $this->model_users->getAdninData($id);
	        	$this->data['user_data'] = $user_data;
				
				$mainpayment_data = $this->model_payment->getMainPaymentData($customer_id);
	            $this->data['mainpayment_data'] = $mainpayment_data;

				$this->render_templates('payment/create', $this->data);	
	        }
		}
	}
	
	 
	public function receipt($customer_id)
	{
		if(!in_array('viewUser', $this->permission)) {
        redirect('dashboard', 'refresh');
		}
		$mainpayment_data = $this->model_payment->getMainPaymentData($customer_id);
	    $this->data['mainpayment_data'] = $mainpayment_data;
		
		$mainpayment_data = $this->model_payment->getMainPaymentData($customer_id);
		$this->data['mainpayment_data'] = $mainpayment_data;
		
		$customer_data = $this->model_customer->getCustomerData($customer_id);
		$this->data['customer_data'] = $customer_data;
		
		$this->data['data'] = $this->model_payment->display_record('payments','customer_id',$customer_id);
		
		$this->render_templatei('payment/receipt', $this->data);
	}
}