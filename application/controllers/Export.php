<?php 

class Export extends Admin_Controller 
{
	public function __construct()
	{
		parent::__construct();
		$this->not_logged_in();
		$this->data['page_title'] = 'Export';
		$this->load->model('model_export');
	    $to_date = date("Y-m-d");
	}

public function index(){
		$usersData = $this->model_export->getUserDetails();
		$this->data['usersData'] = $usersData;
		$this->render_templates('export/index', $this->data);
	}
	
public function export_csv(){ 
		/* file name */
		$filename = 'users_'.date('Ymd').'.csv'; 
		header("Content-Description: File Transfer"); 
		header("Content-Disposition: attachment; filename=$filename"); 
		header("Content-Type: application/csv; ");
	   /* get data */
		$usersData = $this->Crud_model->getUserDetails();
		/* file creation */
		$file = fopen('php: output','w'); 
		$header = array("dist_id","full_name","email"); 
		fputcsv($file, $header);
		foreach ($usersData as $key=>$line){ 
			fputcsv($file,$line); 
		}
		fclose($file); 
		exit; 
	}
	
}