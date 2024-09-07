var digits = "0123456789";
var phoneNumberDelimiters = "()- ";
var validWorldPhoneChars = phoneNumberDelimiters + "+";
var minDigitsInIPhoneNumber = 10;
function isInteger(s)
{   var i;
				for (i = 0; i < s.length; i++)
				{   
								var c = s.charAt(i);
								if (((c < "0") || (c > "9"))) return false;
				}
				return true;
}
function stripCharsInBag(s, bag)
{   var i;
				var returnString = "";
				// Search through string's characters one by one.
				// If character is not in bag, append to returnString.
				for (i = 0; i < s.length; i++)
				{   
								// Check that current character isn't whitespace.
								var c = s.charAt(i);
								if (bag.indexOf(c) == -1) returnString += c;
				}
				return returnString;
}
function checkEmail(email){
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){return (true)}return (false)
}
function check(form){
				var Name = form.name.value;
				var Email = form.email.value;
				
				var Comments = form.comments.value;

				if(Name == ""){
								document.getElementById('error').style.display = "block";
								document.getElementById('error').innerHTML = "Please, Enter the Name ";
								form.name.focus();
								return false;
				}
				if(Email == ""){
								document.getElementById('error').style.display = "block";
								document.getElementById('error').innerHTML = "Please, Enter the Email ";
								form.email.focus();
								return false;
				}
				if(checkEmail(Email) == false){
								document.getElementById('error').style.display = "block";
								document.getElementById('error').innerHTML = "Please, Enter the valid Email";
								form.email.focus();
								return false;
				}
				if(Comments == ''){
								document.getElementById('error').style.display = "block";
								document.getElementById('error').innerHTML = "Please, Enter the Comments";
								form.comments.focus();
								return false;
				}       

}