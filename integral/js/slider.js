$(function(){
	
	var currentValue = $('#numberRecs');
	
	$('#numRecs').change(function(){
	    currentValue.html(this.value);
	});
	
	// Trigger the event on load, so
	// the value field is populated:
	
	$('#numRecs').change();
	
});