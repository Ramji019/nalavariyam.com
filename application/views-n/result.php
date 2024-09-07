<!DOCTYPE html>
<html lang="en">

         <?php include("head.php"); ?>
   <style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>

    <body>
         <?php include("header.php"); ?>
     <?php include("menu-home.php"); ?>
     
	<section class="header_text">
			<h1><b>Welcome to NalaVariyam</b></h1>
			</section>
			<section class="main-content">
							<div class="row">


	<ul class="thumbnails">
			<li class="span3">
			<div class="example-box">
				<p><img src="<?php echo base_url('assets/images/photo/ramji.jpg') ?>" class="img-circle elevation-2"style="width:150px">
</p>
				<a href="" class="title">President</a>
				<p>K.Hawkins BE</p>
				<p>7598984380</p>
			</div>
		</li>
		<li class="span6">

<?php if($this->input->post('group_id') == 2){ 
		$dist_id = $this->input->post('dist_id');

	   $StatesUsers = array('4', '5');
	   $this->db->select("*");
	   $this->db->from("users");
       $this->db->where('users.dist_id',$dist_id);
       $this->db->where_in('users.group_id',$StatesUsers);
	   $query=$this->db->get();
       $query->num_rows();
	   
	   
if($query->num_rows == 0){ ?>
	
<div class="container">
<form action="http://localhost/nalavariyam.com/new/posting/create" method="post">
	   <input type="hidden" name="dist_id" value="<?php echo $dist_id ?>"/>
       <input type="hidden" name="group_id" value="4"/>
       <input type="hidden" name="taluk_id" value=""/>
       <input type="hidden" name="panchayath_id" value=""/>
    <label for="full_name">Full Name</label>
    <input type="text" id="full_name" name="full_name" placeholder="Your name..">

    <label for="phone">Phone Number</label>
    <input type="text" id="phone" name="phone" placeholder="Your Phone Number..">


    <input type="submit" value="Submit">
  </form>
</div>
<?php } elseif($query->num_rows == 1) {?>

<div class="container">
<form action="<?php base_url('posting/create') ?>" method="post" enctype="multipart/form-data" class="form-horizontal">
	   <input type="hidden" name="dist_id" value="<?php echo $dist_id ?>"/>
       <input type="hidden" name="group_id" value="4"/>
       <input type="hidden" name="taluk_id" value=""/>
       <input type="hidden" name="panchayath_id" value=""/>
	           	
    <label for="full_name">Full Name</label>
    <input type="text" id="full_name" name="full_name" placeholder="Your name..">

    <label for="phone">Phone Number</label>
    <input type="text" id="phone" name="phone" placeholder="Your Phone Number..">


    <input type="submit" value="Submit">
  </form>
</div>
<?php } else {?>
				 <h3><center><b>நீங்கள் தேர்வு செய்துள்ள பதவி ஏற்கனவே வேறு நபருக்கு வழங்கபட்டுள்ளதால் நீங்கள் வேறு பதவி வாய்ப்பினை தேர்வு செய்யவும் </b></center></h3>
			<center>
                  <li><a href="<?php echo base_url('posting/select/2') ?>">மாவட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/3') ?>">வட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/4') ?>">ஒன்றிய தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/5') ?>">பஞ்சாயத்து தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/6') ?>">கிளை தலைவர் / செயலாளர் </a></li>
             </center>
			 
<?php } ?>


<!--//////////////////////// -->
<?php } else if($group = $this->input->post('group_id') == 3){ 
	$dist_3 = $this->input->post('dist_id');
	$taluk_3 = $this->input->post('taluk_id');
	   $StatesUsers3 = array('6', '7');
	   $this->db->select("*");
	   $this->db->from("users");
       $this->db->where('users.dist_id',$dist_3);
       $this->db->where('users.taluk_id',$taluk_3);
       $this->db->where_in('users.group_id',$StatesUsers3);
	   $query=$this->db->get();
       $query->num_rows();
	   
if($query->num_rows == 0){ ?>
<input type="hidden" name="dist_id" value="<?php echo $dist_3 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_3 ?>"/>
       <input type="hidden" name="group_id" value="6"/>
			<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table><?php } elseif($query->num_rows == 1) {?>
<input type="hidden" name="dist_id" value="<?php echo $dist_3 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_3 ?>"/>
       <input type="hidden" name="group_id" value="7"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
	<?php } else {?>
 <h3><center><b>நீங்கள் தேர்வு செய்துள்ள பதவி ஏற்கனவே வேறு நபருக்கு வழங்கபட்டுள்ளதால் நீங்கள் வேறு பதவி வாய்ப்பினை தேர்வு செய்யவும் </b></center></h3>
			<center>
                  <li><a href="<?php echo base_url('posting/select/2') ?>">மாவட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/3') ?>">வட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/4') ?>">ஒன்றிய தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/5') ?>">பஞ்சாயத்து தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/6') ?>">கிளை தலைவர் / செயலாளர் </a></li>
             </center>
			 <?php } ?>
	
	
<!--//////////////////////// -->

<?php } else if($group = $this->input->post('group_id') == 4){ 
	$dist_4 = $this->input->post('dist_id');
	$taluk_4 = $this->input->post('taluk_id');
	
	   $StatesUsers4 = array('10', '11');
	   $this->db->select("*");
	   $this->db->from("users");
       $this->db->where('users.dist_id',$dist_4);
       $this->db->where('users.taluk_id',$taluk_4);
       $this->db->where_in('users.group_id',$StatesUsers4);
	   $query=$this->db->get();
       $query->num_rows();
	   
if($query->num_rows == 0){ ?>
<input type="hidden" name="dist_id" value="<?php echo $dist_4 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_4 ?>"/>
       <input type="hidden" name="group_id" value="10"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
	<?php } elseif($query->num_rows == 1) {?>
<input type="hidden" name="dist_id" value="<?php echo $dist_4 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_4 ?>"/>
       <input type="hidden" name="group_id" value="11"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
	<?php } else {?>
 <h3><center><b>நீங்கள் தேர்வு செய்துள்ள பதவி ஏற்கனவே வேறு நபருக்கு வழங்கபட்டுள்ளதால் நீங்கள் வேறு பதவி வாய்ப்பினை தேர்வு செய்யவும் </b></center></h3>
						<center>
                  <li><a href="<?php echo base_url('posting/select/2') ?>">மாவட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/3') ?>">வட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/4') ?>">ஒன்றிய தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/5') ?>">பஞ்சாயத்து தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/6') ?>">கிளை தலைவர் / செயலாளர் </a></li>
             </center>
			 <?php } ?>
	
	
	
	
<!--//////////////////////// -->

<?php } else if($group = $this->input->post('group_id') == 5){ 
	$dist_5 = $this->input->post('dist_id');
	$taluk_5 = $this->input->post('taluk_id');
	$panchayath_5 = $this->input->post('panchayath_id');
	  $StatesUsers5 = array('8', '9');
	   $this->db->select("*");
	   $this->db->from("users");
       $this->db->where('users.dist_id',$dist_5);
       $this->db->where('users.taluk_id',$taluk_5);
       $this->db->where('users.panchayath_id',$panchayath_5);
       $this->db->where_in('users.group_id',$StatesUsers5);
	   $query=$this->db->get();
       $query->num_rows();
	   
if($query->num_rows == 0){ ?>
<input type="hidden" name="dist_id" value="<?php echo $dist_5 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_5 ?>"/>
       <input type="hidden" name="panchayath_6" value="<?php echo $panchayath_5 ?>"/>
       <input type="hidden" name="group_id" value="8"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
	<?php } elseif($query->num_rows == 1) {?>
<input type="hidden" name="dist_id" value="<?php echo $dist_5 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_5 ?>"/>
       <input type="hidden" name="panchayath_6" value="<?php echo $panchayath_5 ?>"/>
       <input type="hidden" name="group_id" value="9"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
	<?php } else {?>
 <h3><center><b>நீங்கள் தேர்வு செய்துள்ள பதவி ஏற்கனவே வேறு நபருக்கு வழங்கபட்டுள்ளதால் நீங்கள் வேறு பதவி வாய்ப்பினை தேர்வு செய்யவும் </b></center></h3>
						<center>
                  <li><a href="<?php echo base_url('posting/select/2') ?>">மாவட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/3') ?>">வட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/4') ?>">ஒன்றிய தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/5') ?>">பஞ்சாயத்து தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/6') ?>">கிளை தலைவர் / செயலாளர் </a></li>
             </center>
			 <?php } ?>
	
<?php } else if($group = $this->input->post('group_id') == 6){ 
	$dist_6 = $this->input->post('dist_id');
	$taluk_6 = $this->input->post('taluk_id');
	$panchayath_6 = $this->input->post('panchayath_id');
	  $StatesUsers6 = array('12', '13');
	   $this->db->select("*");
	   $this->db->from("users");
       $this->db->where('users.dist_id',$dist_6);
       $this->db->where('users.taluk_id',$taluk_6);
       $this->db->where('users.panchayath_id',$panchayath_6);
       $this->db->where_in('users.group_id',$StatesUsers6);
	   $query=$this->db->get();
       $query->num_rows();
	   
if($query->num_rows == 0){ ?>
<input type="hidden" name="dist_id" value="<?php echo $dist_6 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_6 ?>"/>
       <input type="hidden" name="panchayath_6" value="<?php echo $panchayath_6 ?>"/>
       <input type="hidden" name="group_id" value="12"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
	<?php } elseif($query->num_rows == 1) {?>
				
<input type="hidden" name="dist_id" value="<?php echo $dist_6 ?>"/>
       <input type="hidden" name="taluk_id" value="<?php echo $taluk_6 ?>"/>
       <input type="hidden" name="panchayath_6" value="<?php echo $panchayath_6 ?>"/>
       <input type="hidden" name="group_id" value="13"/>
				<table width="475px">
<tr>
	<td valign="top">
		<label for="full_name">
			<h5>Full Name: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="full_name" required maxlength="50"
			size="30">
		</td>
	</tr>
	<td valign="top">
		<label for="phone">
			<h5>Phone Number: *
				<h5 />
			</label>
		</td>
		<td valign="top">
			<input type="text" name="phone" required maxlength="80"
			size="30">
		</td>
	</tr>
		<tr>
			<td colspan="2" style="text-align:center">
				<input type="submit" name="submit" value="Submit">
				
			</td>
		</tr>
	</table>
<?php } else {?>
<h3><center><b>நீங்கள் தேர்வு செய்துள்ள பதவி ஏற்கனவே வேறு நபருக்கு வழங்கபட்டுள்ளதால் நீங்கள் வேறு பதவி வாய்ப்பினை தேர்வு செய்யவும் </b></center></h3>
						<center>
                  <li><a href="<?php echo base_url('posting/select/2') ?>">மாவட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/3') ?>">வட்ட தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/4') ?>">ஒன்றிய தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/5') ?>">பஞ்சாயத்து தலைவர் / செயலாளர் </a></li>
                  <li><a href="<?php echo base_url('posting/select/6') ?>">கிளை தலைவர் / செயலாளர் </a></li>
             </center>
	<?php } ?>

<?php } ?>
       
	   
		</li>

		<li class="span3">
			<div class="example-box">
				<p><img src="<?php echo base_url('assets/images/photo/sarita.jpg') ?>" class="img-circle elevation-2"style="width:150px"></p>
				<a href="" class="title">Secretary</a>
				<p>Mrs G. Saritha B.Sc</p>
				<p> 7598984385</p>
			</div>
		</li>
		

		</ul>
</div>		</div>
								</div>
							</div>
						</div>
						
						<hr>
      <?php include("footer.php"); ?>

		<script src="assets/js/common.js"></script>
		<script src="assets/js/jquery.flexslider-min.js"></script>
		<script type="text/javascript">
			$(function() {
				$(document).ready(function() {
					$('.flexslider').flexslider({
						animation: "fade",
						slideshowSpeed: 4000,
						animationSpeed: 600,
						controlNav: false,
						directionNav: true,
						controlsContainer: ".flex-container" // the container that holds the flexslider
					});
				});
			});
		</script>

    </body>

</html>