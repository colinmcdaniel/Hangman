// Shuffles elements by replacing each element with a random element (Durstenfeld method)
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var currentIndex = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = currentIndex;
    }
    return arr;
}

// Checks if a string is in an array
function inArray(str,arr) {
    for(var i=0;i<arr.length;i++)
        if(arr[i] == str)
        	return true;
    return false;
}

// Sets possible movies in a random order (for every new game)
var movies = ['scream','halloween','psycho','nosferatu','jaws','poltergeist','alien','carrie','frankenstein','dracula'];
movies = shuffleArray(movies);

// Defining variables
var wins = 0;
var wordNumber = 0;
var displayedWord = "";
var guessesRemaining = 12;
var lettersGuessed = [];
var displayedGuesses = "";

// Sets displayed word to correct number of characters
for(i = 0; i < movies[wordNumber].length; i++)
	displayedWord = displayedWord + "_";

// Initial screen output
var outputStr = "Press any key to get started!<br><br><br>Wins<br><br>" + wins
	+ "<br><br><br>Current word<br><br>" + displayedWord
	+ "<br><br><br>Number of guesses remaining<br><br>" + guessesRemaining
	+ "<br><br><br>Letters already guessed<br><br>" + displayedGuesses;
var output = document.getElementById("output");
	output.innerHTML = outputStr;

// Captures key up
document.onkeyup = function(event) {

	// Determines which letter the user pressed and makes it lowercase
	var letter = String.fromCharCode(event.keyCode).toLowerCase();

	// While the letter has not already been guessed...
	if(!inArray(letter,lettersGuessed)){
		lettersGuessed.push(letter);

		if(movies[wordNumber].indexOf(letter) >= 0){
			for(i = 0; i < movies[wordNumber].length; i++)
				if(letter == movies[wordNumber].charAt(i)){
					displayedWord = displayedWord.substr(0, i) + letter + displayedWord.substr(i + 1);
			}
		}
		else{
			guessesRemaining--;
			displayedGuesses = displayedGuesses + letter;
		}

		var outputStr = "Press any key to get started!<br><br><br>Wins<br><br>" + wins
			+ "<br><br><br>Current word<br><br>" + displayedWord
			+ "<br><br><br>Number of guesses remaining<br><br>" + guessesRemaining
			+ "<br><br><br>Letters already guessed<br><br>" + displayedGuesses;
		if(guessesRemaining <= 0)
			var outputStr = outputStr + "<br><br><br>YOU LOSE!!! Refresh page for a new game.";

		var output = document.getElementById("output");
		output.innerHTML = outputStr;

		if(movies[wordNumber] == displayedWord && wordNumber < movies.length - 1){
			wins++;
			wordNumber++;
			displayedWord = "";
			guessesRemaining = 12;
			lettersGuessed = [];
			displayedGuesses = "";

			// Sets displayed word to correct number of characters
			if(wordNumber != movies.length){
				for(i = 0; i < movies[wordNumber].length; i++)
					displayedWord = displayedWord + "_";
			}

			var outputStr = "Press any key to get started!<br><br><br>Wins<br><br>" + wins
				+ "<br><br><br>Current word<br><br>" + displayedWord
				+ "<br><br><br>Number of guesses remaining<br><br>" + guessesRemaining
				+ "<br><br><br>Letters already guessed<br><br>" + displayedGuesses;
			var output = document.getElementById("output");
			output.innerHTML = outputStr;
		}
		else if(movies[wordNumber] == displayedWord && wordNumber == movies.length - 1){
			wins++

			var outputStr = "Press any key to get started!<br><br><br>Wins<br><br>" + wins
				+ "<br><br><br>Current word<br><br>" + displayedWord
				+ "<br><br><br>Number of guesses remaining<br><br>" + guessesRemaining
				+ "<br><br><br>Letters already guessed<br><br>" + displayedGuesses;
			var outputStr = outputStr + "<br><br>YOU WIN!!! Refresh page for a new game.";

			var output = document.getElementById("output");
			output.innerHTML = outputStr;
		}
	}
}