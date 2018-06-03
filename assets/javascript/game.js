$(document).ready(function(){

myWords = ["engine", "animal", "whiskey", "purple", "everest", "fahrenheight", "subaru", "onomatopoeia", "gorilla", "breitling", "chewbacca", "asshole", "falisha", "samsung", "supernova", "johnniewalker", "trump", "dominoes", "microsoft"];

//TO KEEP TRACK OF WINS/LOSSES
var wins = 0;

var losses = 0;

var guessesLeft = 15;

var lettersLeft = 0;

splitWord = [];

hiddenWord = [];


//CLICK START, A NEW WORD IS RNDAOMLY SELECTED

//THE WORD IS THEN SPLIT INTO AN ARRAY OF INDIVIDUAL CHARACTERS
$("#start").on('click', function(){
    $("#start").hide();
    var randomNum = Math.floor(Math.random()*myWords.length);
    splitWord = myWords[randomNum].split("");
    console.log(splitWord);
    console.log(splitWord.length);
    underScores();
    lettersLeft = splitWord.length;
    console.log(lettersLeft);
    $("#guesses-remaining").html( "<p>" + guessesLeft + "</p>" );
    return splitWord, lettersLeft;
});

//FUNCTION CREATES UNDERSCORES THAT WILL BE PRODUCED BASED ON THE INDEX LENGTH OF THE GUESSED WORD.

function underScores(){
    for ( var i = 0; i < splitWord.length; i++) {
        hiddenWord.push("_"); 
    };
    console.log(hiddenWord);
    $("#theWord").html("<p>" + hiddenWord + "<p>");
    return hiddenWord;
};


//ANY LETTER THAT IS CLICKED WILL RUN THROUGH A FUNCTION WITH A FOR LOOP THAT WILL VERIFY IF THE CHOSEN LTTER MATCHES EACH THE GUESSING WORD AT THE CURRENT ITERATION.

$(".aButton").on('click', function(){
    console.log(this);
    var letter = this.value;
    console.log(letter);
    var countDown = splitWord.length;
    var go_nogo = false;

    for (var i = 0; i < splitWord.length; i++){
        console.log(splitWord[i]);
        if(letter === splitWord[i]){
            countDown = countDown-1;
            go_nogo = true;
            hiddenWord[i] = letter;
            $("#theWord").html("<p>" + hiddenWord + "<p>");
            lettersLeft = lettersLeft-1;
            if(lettersLeft === 0){
                Winner();
                break;
            }
        }

        else{
            countDown = countDown-1;
            if (countDown === 0 && go_nogo == false){
                $("#guesses").append(letter);
                guessesLeft = guessesLeft-1;
                if(guessesLeft === 0){
                    GameOver();
                }
                else{
                    console.log( "you have "+ guessesLeft + " guesses left");
                    $("#guesses-remaining").html( "<p>" + guessesLeft + "</p>" );
                }   
            }
            else if (countDown === 0 && go_nogo == true){
                break;   
            }

        }

    }
    $(this).hide();
    return splitWord, hiddenWord, lettersLeft, guessesLeft;
});

function GameOver(){
 console.log("u loose");
}

function Winner(){
    $("#keyboard").html( "<p>" + guessesLeft + "</p>" );
}



})