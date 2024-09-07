function moveToSelectedBeats()
{
    var inFilter = document.form_add_outlets.beats_to_select
    var outFilter = document.form_add_outlets.selected_beats
    var outLength = outFilter.length
    var inLength = inFilter.length

    if (inFilter.selectedIndex > -1)
    {
			outFilter.options[outLength] = new Option (inFilter.options[inFilter.selectedIndex].text,inFilter.options[inFilter.selectedIndex].text, false,true)
			inFilter.options[inFilter.selectedIndex] = null
    }
}

function moveFromSelectedBeats()
{	var inFilter = document.form_add_outlets.beats_to_select
    var outFilter = document.form_add_outlets.selected_beats
    var outLength = outFilter.length
    var inLength = inFilter.length
    var i
    var filterValue = ''

	if (outFilter.selectedIndex > -1)
	{
	inFilter.options[inLength] = new Option (outFilter.options[outFilter.selectedIndex].text,outFilter.options[outFilter.selectedIndex].text, false,false)
    filterValue = outFilter.options[outFilter.selectedIndex].text
	outFilter.options[outFilter.selectedIndex] = null
	} // end of if selected index exists

	for (i=0; i<outLength - 1; i++)
  {
    outFilter.options[i].selected = true
  }
}
