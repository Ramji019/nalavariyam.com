<!DOCTYPE html>
<html lang="en">

         <?php include("head.php"); ?>

    <body>
         <?php include("header.php"); ?>
     <?php include("menu-home.php"); ?>
     
	<section class="header_text">
			<h1><b>Welcome to NalaVariyam</b></h1>
			</section>
			<section class="main-content">
							<div class="row">
								<div class="span12">
									<div class="row">
										<div class="span12">
											<h4 class="title">
											
												
											<div id="myCarousel" class="myCarousel carousel slide">
												<div class="carousel-inner">
										<div class="active item">

	<ul class="thumbnails">
		
		<li class="span3">
			<div class="example-box">
				<p><img src="<?php echo base_url('assets/images/photo/user.jpg') ?>" class="img-circle elevation-2"style="width:150px">
</p>
				<a href="" class="title">President</a>
				<p>K.Hawkins BE</p>
				<p>7598984380</p>
			</div>
		</li>
		<li class="span6">
 <form action="<?php echo base_url('posting/result') ?>" method="post" class="form-horizontal">

<?php if($group = $this->uri->segment(3) == 2){ ?>
				 <h3><center><a href="nalavariyam.com"><b>மாவட்ட </b> தலைவர் / செயலாளர்</a></center></h3>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="dist_id" id="district" style="width: 100%;" required="required">
                           <option value="">Select District Name</option>
                           <?php foreach($district_data as $val) { ?> 
                           <option value="<?php echo $val['id'];?>">
                              <?php echo $val['district_name'];?>
                           </option>
                           <?php } ?>
                        </select>
                     </div>
                  </div>
                  <input type="hidden" value="<?php echo $this->uri->segment(3); ?>" name="group_id" id="group_id">
<?php } else if($group = $this->uri->segment(3) == 3){ ?>
				 <h3><center><a href="nalavariyam.com"><b>வட்ட </b> தலைவர் / செயலாளர்</a></center></h3>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="dist_id" id="district" style="width: 100%;" required="required">
                           <option value="">Select District Name</option>
                           <?php foreach($district_data as $val) { ?> 
                           <option value="<?php echo $val['id'];?>">
                              <?php echo $val['district_name'];?>
                           </option>
                           <?php } ?>
                        </select>
                     </div>
                  </div>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="taluk_id" id="taluk" style="width: 100%;" required="required">
                           <option value="">Select Taluk</option>
                        </select>
                     </div>
                  </div>
                  <input type="hidden" value="<?php echo $this->uri->segment(3); ?>" name="group_id" id="group_id">

<?php } else if($group = $this->uri->segment(3) == 4){ ?>
				 <h3><center><a href="nalavariyam.com"><b>ஒன்றிய </b> தலைவர் / செயலாளர்</a></center></h3>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="dist_id" id="district" style="width: 100%;" required="required">
                           <option value="">Select District Name</option>
                           <?php foreach($district_data as $val) { ?> 
                           <option value="<?php echo $val['id'];?>">
                              <?php echo $val['district_name'];?>
                           </option>
                           <?php } ?>
                        </select>
                     </div>
                  </div>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="taluk_id" id="taluk" style="width: 100%;" required="required">
                           <option value="">Select Taluk</option>
                        </select>
                     </div>
                  </div>
                  <input type="hidden" value="<?php echo $this->uri->segment(3); ?>" name="group_id" id="group_id">
<?php } else if($group = $this->uri->segment(3) == 5){ ?>
				 <h3><center><a href="nalavariyam.com"><b>பஞ்சாயத்து </b> தலைவர் / செயலாளர்</a></center></h3>

                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="dist_id" id="district" style="width: 100%;" required="required">
                           <option value="">Select District Name</option>
                           <?php foreach($district_data as $val) { ?> 
                           <option value="<?php echo $val['id'];?>">
                              <?php echo $val['district_name'];?>
                           </option>
                           <?php } ?>
                        </select>
                     </div>
                  </div>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="taluk_id" id="taluk" style="width: 100%;" required="required">
                           <option value="">Select Taluk</option>
                        </select>
                     </div>
                  </div>
				  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="panchayath_id" id="panchayath" style="width: 100%;" required="required">
                           <option value="">Select Village</option>
                        </select>
                     </div>
                  </div>
                  <input type="hidden" value="<?php echo $this->uri->segment(3); ?>" name="group_id" id="group_id">
<?php } else if($group = $this->uri->segment(3) == 6){ ?>
				 <h3><center><a href="nalavariyam.com"><b>கிளை </b> தலைவர் / செயலாளர்</a></center></h3>

                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="dist_id" id="district" style="width: 100%;" required="required">
                           <option value="">Select District Name</option>
                           <?php foreach($district_data as $val) { ?> 
                           <option value="<?php echo $val['id'];?>">
                              <?php echo $val['district_name'];?>
                           </option>
                           <?php } ?>
                        </select>
                     </div>
                  </div>
                  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="taluk_id" id="taluk" style="width: 100%;" required="required">
                           <option value="">Select Taluk</option>
                        </select>
                     </div>
                  </div>
				  <div class="form-group">
                     <div class="col-sm-12">
                        <select class="form-control select2bs4" name="panchayath_id" id="panchayath" style="width: 100%;" required="required">
                           <option value="">Select Village</option>
                        </select>
                     </div>
                  </div>
                  <input type="hidden" value="<?php echo $this->uri->segment(3); ?>" name="group_id" id="group_id">

                  <?php } ?>
                  <?php  if($this->input->post('group_id') == 1){ ?>
                  <?php } else { ?>
				  </br>
                  <div class="row">
                     <div class="col-12">
                        <center><input type="submit" name="submit" value="Submit"></center>
                     </div>
                  </div>
                  <?php } ?>
            
			
      </form> 
		</li>
		<li class="span3">
			<div class="example-box">
				<p><img src="<?php echo base_url('assets/images/photo/girl.jpg') ?>" class="img-circle elevation-2"style="width:150px"></p>
				<a href="" class="title">Secretary</a>
				<p>Mrs G. Saritha B.Sc</p>
				<p>7598984385</p>
			</div>
		</li>
		

		</ul>
</div>		</div>
								</div>
							</div>
						</div>
						</div>
						</div>
						</section>
						
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
      <script type="text/javascript">
         $('#district').on('change', function() { 
         	cat1_val = $(this).find(":selected").val();
         	if(cat1_val >0){
         	$.ajax({
         		type: "POST",
         		url: "<?php echo base_url();?>" + "posting/get_sub_Taluk", 
         		data: {district: cat1_val},
         		dataType: "text",  
         		cache:false,
         		success: 
         			function(data){
         				$('#taluk').empty().append(data);
         			}
         		});// you have missed this bracket
         		return false;
         	}
         	});
         
         	$('#taluk').on('change', function() { 
         
         	cat1_val = $(this).find(":selected").val();
         	if(cat1_val >0){
         	$.ajax({
         		type: "POST",
         		url: "<?php echo base_url();?>" + "posting/get_sub_President", 
         		data: {taluk: cat1_val},
         
         		dataType: "text",  
         		cache:false,
         		success: 
         			function(data){
         				$('#panchayath').empty().append(data);
         			}
         		});// you have missed this bracket
         		return false;
         	}
         	}); 
          
      </script>
    </body>

</html>