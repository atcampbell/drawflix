

$(document).ready( function() {



	//when find film button clicked
	$('#submit_search').click(function(event){
		var searchFilm =  $("#film_search").val(); //value to search for is value in searchFilm box
		$.ajax({
			type: 'GET',
  url: 'http://www.omdbapi.com/?s=' + searchFilm,
  dataType: 'json',
  async: false,
  success: function(json_data){
		$('#options option').remove(); //remove any previous options on the dropdown
		for (var i = 0; i < json_data.Search.length; i++) { //loop through JSON results and append to options
		$('#options').append('<option value="' + json_data.Search[i].Title + '">' + json_data.Search[i].Title + '</option>');
		}
		//hide form error if currently displayed
		$("#submit_error").hide();
		//unhide the options box if hidden(default)
		$("#options").show();
		//clear the search box for next input
		$("#film_search").val('');
		//auto selects first film in dropdown if first result of search is desired user response
		$("#id_film").val($("#options").val());
	}
		});
	});

//adds selected film to hidden submission form
$("#options").on("change", function() {
      $("#id_film").val($(this).val());
    });



	//for likes ----------
	$(document).on("click","#like", function(){
		var catid;
		catid = $(this).attr("data-catid");
		$.get('/like_drawing/', {drawing_id: catid}, function(data){
			$('#' + catid).html(data);

    });

	});

//creates drawing board object
	var myBoard = new DrawingBoard.Board('test_board',{
	controls: [
		'Color',
		{ Size: { type: 'dropdown' } },
		{ DrawingMode: { filler: true } },
		'Navigation',
	],
	size: 1,
	webStorage: 'local',
	enlargeYourContainer: true
});

//when user submits drawing
	$("#finalise").click(function() {

		film = $("#id_film").val();
		//if film has been selected
		if(film != '') {

		var canvas = myBoard.getImg();

		$("#id_image").val(canvas);
		$('#confirm_drawing').click()
		$('.drawing-board-control-navigation-reset').click();
}
else { //if not, display error message
	$("#submit_error").fadeIn(500);
}

});

//fades in content
$("#fade_in").fadeIn(1000);

//highlights current page on navbar
$(function(){
  $('a').each(function() {
    if ($(this).prop('href') == window.location.href) {
      $(this).addClass('highlights');
    }
  });
});

});
