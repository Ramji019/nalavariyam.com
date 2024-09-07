function validateQuestionCategorySelection(form)
{
	for (i=0;i<form.question_category.length;i++)
	{
			if (form.question_category[i].checked)
			{
				return true;
			}
	}
	alert("Please select atleast one question category");
	return false;
}

function validateQuestionAnswerSelection(form)
{
	for (i=0;i<form.test_question_choice.length;i++)
	{
		if (form.test_question_choice[i].checked)
		{
			return true;
		}
	}
	
	alert("Please select atleast one answer for each questions");
	return false;
}