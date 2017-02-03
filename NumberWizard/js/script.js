$( document ).ready(function() {
   
    var guessCount = 10;
    $('#guessCount').text(parseInt(guessCount));
    var min = 1;
    var max = 1001;
    var initialValue = 500;
    var currentGuess = parseInt($('#guess').text());
    
    $('.less').click(function(){
         
        max = currentGuess;
        NextGuess();
         
    });
    
    $('.more').click(function(){
        
        min = currentGuess;
        NextGuess();
        
    });
    
    $('.ok').click(function(){
        
        LostGame();
        
    });
    
    function NextGuess () {
		
        currentGuess =  Math.floor(Math.random() * (max - min)) + min;
        $('#guess').text(parseInt(currentGuess));
        guessCount--;
        $('#guessCount').text(parseInt(guessCount));
        
        if(guessCount < 1) {
            $('#guessCount').text('0');
            WinGame();
        }
        
	} 
    
    function WinGame() {
        
        //alert('wygrałeś!');
        RestartGame();
        
    }
    
    function LostGame() {

        //alert('Przegrałeś!');
        RestartGame();
        
    }
    
    function RestartGame() {
        $('#guess').text(initialValue);
        currentGuess = initialValue;
        guessCount = 10;
        $('#guessCount').text(parseInt(guessCount));

        min = 1;
        max = 1001;
    }
    
    
});
