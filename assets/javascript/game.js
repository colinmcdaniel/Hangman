var wins = 0;
var losses = 0;
var wordNumber = 0;
var displayedWord = "";
var guessesRemaining = 12;
var lettersGuessed = [];
var displayedGuesses = "";
var movies = [
	'spotlight',
	'spectre',
	'birdman',
	'whiplash',
	'boyhood',
	'interstellar',
	'gravity',
	'frozen',
	'her',
	'argo',
	'skyfall',
	'hugo',
	'inception',
	'avatar',
	'up',
	'juno',
	'crash',
	'ray',
	'chicago',
	'adaptation',
	'shrek',
	'gladiator',
	'traffic',
	'titanic',
	'fargo',
	'braveheart',
	'speed',
	'jfk',
	'misery',
	'alien',
	'casablanca',
	'goldfinger',
	'jaws',
	'nashville',
	'platoon',
	'rocky',
	'witness'
	];
var introOut = document.getElementById("intro");
var winsTitleOut = document.getElementById("wins-title");
var winsOut = document.getElementById("wins");
var lossesTitleOut = document.getElementById("losses-title");
var lossesOut = document.getElementById("losses");
var wordTitleOut = document.getElementById("word-title");
var wordOut = document.getElementById("word");
var numGuessesTitleOut = document.getElementById("num-guesses-title");
var numGuessesOut = document.getElementById("num-guesses");
var lettersTitleOut = document.getElementById("letters-title");
var lettersOut = document.getElementById("letters");
var leftImage = document.getElementById("left-image");


// Shuffles elements by replacing each element with a random element
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


// Randomly orders movies for each new game
movies = shuffleArray(movies);

// Sets displayed word to correct number of characters
for(i = 0; i < movies[wordNumber].length; i++)
	displayedWord = displayedWord + "_";

// Initial screen output
introOut.innerHTML = "Press any key to get started!";
winsTitleOut.innerHTML = "Wins";
winsOut.innerHTML = wins;
lossesTitleOut.innerHTML = "Losses";
lossesOut.innerHTML = losses;
wordTitleOut.innerHTML = "Current word";
wordOut.innerHTML = displayedWord;
numGuessesTitleOut.innerHTML = "Guesses remaining";
numGuessesOut.innerHTML = guessesRemaining;
lettersTitleOut.innerHTML = "Letters already guessed";
lettersOut.innerHTML = displayedGuesses;

document.onkeyup = function(event) {

	// Determines which letter the user pressed and makes it lowercase
	var letter = String.fromCharCode(event.keyCode).toLowerCase();

	// While letter is a real letter and has not already been guessed...
	if(!inArray(letter,lettersGuessed) && letter.match(/[a-z]/i)){
		lettersGuessed.push(letter);

		// If correct guess...
		if(movies[wordNumber].indexOf(letter) >= 0){

			// Replace "_" with guessed letter
			for(i = 0; i < movies[wordNumber].length; i++)
				if(letter == movies[wordNumber].charAt(i)){
					displayedWord = displayedWord.substr(0, i) + letter + displayedWord.substr(i + 1);
			}

			// If won game...
			if(movies[wordNumber] == displayedWord){
				wins++;

				// Display movie poster
				leftImage.src = "assets/images/" + movies[wordNumber] + ".jpg";

				// Reset initial variables
				displayedWord = "";
				guessesRemaining = 12;
				lettersGuessed = [];
				displayedGuesses = "";

				// If there are more unplayed words...
				if(wordNumber < movies.length - 1)
					wordNumber++;

				// If user has played all words...
				else if(wordNumber == movies.length - 1)
					wordNumber = 0;

				// Resets displayed word to hidden
				for(i = 0; i < movies[wordNumber].length; i++)
					displayedWord = displayedWord + "_";
			}
		}

		// If incorrect guess...
		else{
			guessesRemaining--;

			// Display next hangman picture
			leftImage.src = "assets/images/" + guessesRemaining + ".jpg";

			// If lost game...
			if(guessesRemaining == 0){
				losses++;

				// Reset initial variables
				displayedWord = "";
				guessesRemaining = 12;
				lettersGuessed = [];
				displayedGuesses = "";

				// If there are more unplayed words...
				if(wordNumber < movies.length - 1)
					wordNumber++;

				// If user has played all words...
				else if(wordNumber == movies.length - 1)
					wordNumber = 0;

				// Resets displayed word to hidden
				for(i = 0; i < movies[wordNumber].length; i++)
					displayedWord = displayedWord + "_";
			}

			// If haven't lost, display guessed letter
			else{
				if(displayedGuesses.length == 0)
					displayedGuesses = displayedGuesses + letter;
				else
					displayedGuesses = displayedGuesses + "  " + letter;
			}
		}

		// Update screen
		winsOut.innerHTML = wins;
		lossesOut.innerHTML = losses;
		wordOut.innerHTML = displayedWord;
		numGuessesOut.innerHTML = guessesRemaining;
		lettersOut.innerHTML = displayedGuesses;
	}
}