<!DOCTYPE html>
<html lang="en">

         <?php include("head.php"); ?>

    <body>
         <?php include("header.php"); ?>
     <?php include("menu-home.php"); ?>
     
	<section class="header_text">
			<h1><b>About Us</b></h1>
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
		
		<li class="span6">
					<div class="example-box">

			<p>
Tamil Nadu Ramji Construction and Organizational and UnOrganization Public Workers Union led by State President K.HAWKINS was registered on 23May2014, Kanyakumari district is headquartered in Koothanvilai village under Palapallam panchayat. Our union is legally registered under the provisions of the 1926 Labour Act. Registration No.713 / KKM.</p></div>
		</li>

		<li class="span6">
				<p><img src="<?php echo base_url('assets/images/about.jpg') ?>" class="img-circle elevation-2"style="width:600px">
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