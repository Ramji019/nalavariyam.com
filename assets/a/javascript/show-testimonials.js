function pausescroller(testimonial, divId, divClass, delay)
{
	this.testimonial=testimonial //Array of Testimonial
	this.testimonialId=divId //ID of ticker div to display information
	this.delay=delay //Delay between msg change, in miliseconds.
	this.mouseoverBol=0 //Boolean to indicate whether mouse is currently over scroller (and pause it if it is)
	this.hiddendivpointer=1 //index of message array for hidden div
	document.write('<div id="'+divId+'" class="'+divClass+'" style="position: relative; overflow: hidden"><div class="innerDiv" style="position: absolute; width: 100%" id="'+divId+'1">'+testimonial[0]+'</div><div class="innerDiv" style="position: absolute; width: 100%; visibility: hidden" id="'+divId+'2">'+testimonial[1]+'</div></div>')
	var scrollerinstance=this
	if (window.addEventListener) //run onload in DOM2 browsers
	{
		window.addEventListener("load", function(){scrollerinstance.initialize()}, false)
	}
	else if (window.attachEvent) //run onload in IE5.5+
	{
		window.attachEvent("onload", function(){scrollerinstance.initialize()})
	}
	else if (document.getElementById) //if legacy DOM browsers, just start scroller after 0.5 sec
	{
		setTimeout(function(){scrollerinstance.initialize()}, 500)
	}
}

pausescroller.prototype.initialize=function()
{
	this.tickerdiv=document.getElementById(this.testimonialId)
	this.visiblediv=document.getElementById(this.testimonialId+"1")
	this.hiddendiv=document.getElementById(this.testimonialId+"2")
	this.visibledivtop=parseInt(pausescroller.getCSSpadding(this.tickerdiv))
	//set width of inner DIVs to outer DIV's width minus padding (padding assumed to be top padding x 2)
	this.visiblediv.style.width=this.hiddendiv.style.width=this.tickerdiv.offsetWidth-(this.visibledivtop*2)+"px"
	this.getinline(this.visiblediv, this.hiddendiv)
	this.hiddendiv.style.visibility="visible"
	var scrollerinstance=this
	document.getElementById(this.testimonialId).onmouseover=function(){scrollerinstance.mouseoverBol=1}
	document.getElementById(this.testimonialId).onmouseout=function(){scrollerinstance.mouseoverBol=0}
	if (window.attachEvent) //Clean up loose references in IE
	{
		window.attachEvent("onunload", function(){scrollerinstance.tickerdiv.onmouseover=scrollerinstance.tickerdiv.onmouseout=null})
	}
	setTimeout(function(){scrollerinstance.moveUpTestimonial()}, this.delay)
}


pausescroller.prototype.moveUpTestimonial=function()
{
	var scrollerinstance=this
	if (parseInt(this.hiddendiv.style.top)>(this.visibledivtop+5))
	{
		this.visiblediv.style.top=parseInt(this.visiblediv.style.top)-5+"px"
		this.hiddendiv.style.top=parseInt(this.hiddendiv.style.top)-5+"px"
		setTimeout(function(){scrollerinstance.moveUpTestimonial()}, 50)
	}
	else
	{
		this.getinline(this.hiddendiv, this.visiblediv)
		this.swapTestimonial()
		setTimeout(function(){scrollerinstance.setTestimonial()}, this.delay)
	}
}

pausescroller.prototype.swapTestimonial=function()
{
	var tempcontainer=this.visiblediv
	this.visiblediv=this.hiddendiv
	this.hiddendiv=tempcontainer
}

pausescroller.prototype.getinline=function(div1, div2)
{
	div1.style.top=this.visibledivtop+"px"
	div2.style.top=Math.max(div1.parentNode.offsetHeight, div1.offsetHeight)+"px"
}

pausescroller.prototype.setTestimonial=function()
{
	var scrollerinstance=this
	if (this.mouseoverBol==1) //if mouse is currently over scoller, do nothing (pause it)
	{
		setTimeout(function(){scrollerinstance.setTestimonial()}, 100)
	}
	else
	{
		var i=this.hiddendivpointer
		var ceiling=this.testimonial.length
		this.hiddendivpointer=(i+1>ceiling-1)? 0 : i+1
		this.hiddendiv.innerHTML=this.testimonial[this.hiddendivpointer]
		this.moveUpTestimonial()
	}
}

pausescroller.getCSSpadding=function(tickerobj)
{ //get CSS padding value, if any
	if (tickerobj.currentStyle)
	{
		return tickerobj.currentStyle["paddingTop"]
	}
	else if (window.getComputedStyle) //if DOM2
	{
		return window.getComputedStyle(tickerobj, "").getPropertyValue("padding-top")
	}
	else
	{
		return 0
	}
}

