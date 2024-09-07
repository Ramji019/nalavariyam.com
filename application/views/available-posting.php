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
		<center>
                  <li class="btn btn-primary"><a href="<?php echo base_url('posting/select/2') ?>">மாவட்ட தலைவர் / செயலாளர் </a></li></br></br>
                  <li class="btn btn-primary"><a href="<?php echo base_url('posting/select/3') ?>">வட்ட தலைவர் / செயலாளர் </a></li></br></br>
                  <li class="btn btn-primary"><a href="<?php echo base_url('posting/select/4') ?>">ஒன்றிய தலைவர் / செயலாளர் </a></li></br></br>
                  <li class="btn btn-primary"><a href="<?php echo base_url('posting/select/5') ?>">பஞ்சாயத்து தலைவர் / செயலாளர் </a></li></br></br>
                  <li class="btn btn-primary"><a href="<?php echo base_url('posting/select/6') ?>">கிளை தலைவர் / செயலாளர் </a></li>
             </center>
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