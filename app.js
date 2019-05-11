//Array of Video Games user has to sleect from upon site entry
var game = ['Super Mario', 'Kingdom Hearts', 'Pokemon', 'MegaMan', 'Fire Emblem', 'Undertale', 
'Donkey Kong', 'Super Smash Bros', 'Sonic The Hedgehog', 'Xenoblade Chronicles', 'Kirby','Legend of Zelda']


$( document ).ready(function(){

// This is where we append the video game memes
	renderButtons();

	// This is where AJAX functions are creating the default game button categories for 
	//viwers to click on upon site entry.
	$(document).on('click', '.game_buttons', displaygameGif);

	$(document).on('click', '.game_container', showGifHideImage);

	function renderButtons(){ 

		// Deletes any previous button to prevent duplicates
		$('#game_buttons').empty();

		// Loops through the array of games
		for (var i = 0; i < game.length; i++){

			// Then dynamicaly generate a button for each game in the array.
		    var gameButton = $('<button>') 
		    gameButton.addClass('game_buttons');
		    gameButton.attr('data-name', game[i]); 
		    gameButton.text(game[i]); 
		    $('#game_buttons').append(gameButton);
		}
	}
	// Add new game from the user input
	$('#add_game').on('click', function(){
		var newgame = $('#game_input').val().trim().toLowerCase();


		// Validate user input
		var isUnique = true;
		//We need an if/then statement to keep the user for creating multiple buttons that
		//populate the same video game memes. 
		for(var i = 0; i < game.length; i++){
			if(game[i] == newgame){
				isUnique = false;
			}
		}
        //This is being used if the useer does not enter anything in the field 
		if(newgame == ""){
			alert("Sorry. No empty buttons are allowed!")
		}
		
		else if(isUnique){

			//If the user adds a new, unique button, this is the function that will push 
			//it to the list of existing game meme buttons. 

			game.push(newgame)
			renderButtons();
		}
		else{
			alert("You already have a " + newgame + " button!")
		}
		return false;
	})

	// Collect gaming meme gif from GIPHY and display it to the DOM when the game button is clicked
	function displaygameGif(){

		// This is the function that is needed to load in new game memes if one is currently 
		//being displayed. 
		$('#game_images').empty();

		// Collect game name data attribute from the button, replacing any spaces.
		var game = $(this).attr('data-name').replace(/ /g, '+');

		// API Information 
		var api_key = "2YUa5yMPYOroqsBYCSfkdSObICQWrY1t";
		var limit = "10"; 
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&limit=" + limit + "&api_key=" + api_key;

		
		// Creates AJAX call for the specific gaming meme button upon click. 
		$.ajax({url: queryURL, 
			method: 'GET'
		})
		.done(function(response)
		{

			// Loops through the output to collect each of the gaming meme objects. 
			for(var i = 0; i < response.data.length; i++){

				// Collect the game meme gif URLs
				var currentStillURL = response.data[i].images.fixed_height_still.url; 
				var currentMovingURL = response.data[i].images.fixed_height.url; 

				// Collect the gaming meme gif Ratings
				var currentRating = response.data[i].rating;

					// Correct for empty rating
					if(currentRating == ""){
						currentRating = "none";
					}


				// Create a Div to house Gif and Rating
				var currentGifDiv = $('<div>');
				currentGifDiv.addClass('gif_container'); // Added a class
				currentGifDiv.attr('data-name', "unclicked"); // Added a Data Attributed for clicked
				
				// Append Rating to current gif
				var currentGifRating = $('<h1>');
				currentGifRating.text("Rating: " + currentRating);
				currentGifDiv.append(currentGifRating);

				// Append Still Image
				var currentGifImage = $('<img>');
				currentGifImage.addClass('still_gif'); // Added a class for still gif
				currentGifImage.attr("src", currentStillURL);
				currentGifDiv.append(currentGifImage);

				// Append Moving Gif Image
				var currentGif = $('<img>')
				currentGif.addClass('moving_gif'); // Added a class for animated gif
				currentGif.attr("src", currentMovingURL);
				currentGif.hide();
				currentGifDiv.append(currentGif);

				// Append current Div to the DOM
			    $('#game_images').append(currentGifDiv);

			}

		});	
	}
	// Display the Moving gif and Hide the still Image
	function showGifHideImage(){

		// Determine in the gif was already clicked
		var clickTest = $(this).attr('data-name');
		
		// Gif is not clicked yet - Hide the still image & display the moving image
		if(clickTest == "unclicked"){

			var gifChildren = $(this).children();

			// Hide the Still Image
			$(gifChildren[1]).hide();

			// Display the Moving Image
			$(gifChildren[2]).show();

			// Change Data Name to clicked
			$(this).attr('data-name', "clicked");

		}
		// Gif was already clicked - Hide the moving image & show the still image
		else{

			var gifChildren = $(this).children();

			// Hide the Moving Image
			$(gifChildren[2]).hide();

			// Display the Still Image
			$(gifChildren[1]).show();

			// Change Data Name to unclicked
			$(this).attr('data-name', "unclicked");

		}
	}
});
