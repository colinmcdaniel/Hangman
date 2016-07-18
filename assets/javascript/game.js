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
var movies = ['scream',
	'halloween',
	'psycho',
	'nosferatu',
	'jaws',
	'poltergeist',
	'alien',
	'carrie',
	'frankenstein',
	'dracula'];

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
var introOut = document.getElementById("intro");
introOut.innerHTML = "Press any key to get started!";

var winsTitleOut = document.getElementById("wins-title");
winsTitleOut.innerHTML = "Wins";

var winsOut = document.getElementById("wins");
winsOut.innerHTML = wins;

var wordTitleOut = document.getElementById("word-title");
wordTitleOut.innerHTML = "Current word";

var wordOut = document.getElementById("word");
wordOut.innerHTML = displayedWord;

var numGuessesTitleOut = document.getElementById("num-guesses-title");
numGuessesTitleOut.innerHTML = "Number of guesses remaining";

var numGuessesOut = document.getElementById("num-guesses");
numGuessesOut.innerHTML = guessesRemaining;

var lettersTitleOut = document.getElementById("letters-title");
lettersTitleOut.innerHTML = "Letters already guessed";

var lettersOut = document.getElementById("letters");
lettersOut.innerHTML = displayedGuesses;









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

		wordOut.innerHTML = displayedWord;
		numGuessesOut.innerHTML = guessesRemaining;
		lettersOut.innerHTML = displayedGuesses;

		if(guessesRemaining <= 0)
			introOut.innerHTML = "YOU LOSE!!! Refresh page for a new game.";

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

			winsOut.innerHTML = wins;
			wordOut.innerHTML = displayedWord;
			numGuessesOut.innerHTML = guessesRemaining;
			lettersOut.innerHTML = displayedGuesses;
		}
		else if(movies[wordNumber] == displayedWord && wordNumber == movies.length - 1){
			wins++

			winsOut.innerHTML = wins;

			// USE APPENDCHILD FOR THIS AND FOR LOSES TOO
			introOut.innerHTML = "YOU WIN!!! Refresh page for a new game.";
		}
	}
}