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




function replaceStr(index,str,char){

}



// Sets possible movies in a random order (for every new game)
var movies = ['ida','sipper'];
movies = shuffleArray(movies);

// Defining variables
var wins = 0;
var displayedWord = "";
var guessesRemaining = 12;
var lettersGuessed = "";

// Sets displayed word to correct number of characters
for(i = 0; i < movies[0].length; i++){
	displayedWord = displayedWord + "_";
}

// Initial screen output
var outputStr = "Press any key to get started!<br><br>Wins<br><br>" + wins
	+ "<br><br>Current word<br><br>" + displayedWord
	+ "<br><br>Number of guesses remaining<br><br>" + guessesRemaining
	+ "<br><br>Letters already guessed<br><br>" + lettersGuessed;
var output = document.getElementById("output");
	output.innerHTML = outputStr;

// Captures key up
document.onkeyup = function(event) {

	// Determines which letter the user pressed and makes it lowercase
	var letter = String.fromCharCode(event.keyCode).toLowerCase();

	for(i = 0; i < movies[0].length; i++){
		if(letter == movies[0].charAt(i)){
			displayedWord = displayedWord.substr(0, i) + letter + displayedWord.substr(i + 1);
		}
	}

	var outputStr = "Press any key to get started!<br><br>Wins<br><br>" + wins
		+ "<br><br>Current word<br><br>" + displayedWord
		+ "<br><br>Number of guesses remaining<br><br>" + guessesRemaining
		+ "<br><br>Letters already guessed<br><br>" + lettersGuessed;

	var output = document.getElementById("output");
	output.innerHTML = outputStr;
}