$(document).ready(function(){
    
    
    var params = {
        action: 'add',
        name : name,
        score : parseInt($('#score').text())

    }
    
    $('#myBtn').on('click', function() {
        getScores(params);
        
    });
    

	function getScores(){
        
        $.ajax({
            
            url: 'json.php',
            method: 'GET',
            data: {
                action: 'show'
            },
            success: function(received) {
                //alert('AJAX POBIERANIE dziala');
                console.log(received);
                createList(received);
            },
            error: function(error) {
                //alert('AJAX POBIERANIE nie dziala');
                console.log(error);
            }
        });
    };
        
        
    function setScores(params) {
        
        $.ajax({
            url: 'json.php',
            method: 'GET',
            data: params,
            success: function() {
			    //alert('Ajax WYSYŁANIE dziala');
                
            },
            error: function() {
                //alert('Ajax WYSYŁANIE nie dziala');
            }
            
        });
    };  
    
    
    function createList (received) {
        
        $('.modal-content').html('');
        
        var p = '';
        $('.modal-content').append(p);
            p += '<div class="leaderboard">';
            p += '<div class="col-xs-4 userPosition">';
            p += 'Pozycja:';
            p += '<ul class="list-unstyled">';
            for(var i = 1; i <= received.posts.length; i++) {
                p += '<li>' + i + '.' + '</li>';
            }
            p += '</ul>';
            p += '</div>';
        
            p += '<div class="col-xs-4 userName">';
            p += 'Gracz:';
            p += '<ul class="list-unstyled">';
            for(var i = 0; i < received.posts.length; i++) {
                p += '<li>' + received.posts[i].name + '</li>';
            }
            p += '</ul>';
            p += '</div>';
        
            p += '<div class="col-xs-4 userScore">';
            p += 'Wynik:';
            p += '<ul class="list-unstyled">';
            for(var i = 0; i < received.posts.length; i++) {
                p += '<li>' + received.posts[i].score + '</li>';
            }
            p += '</ul>';
            p += '</div>';
        
            $('.modal-content').append(p);
    };
    
    
    $('#save').on('click', function() {
        params.name = ($('#name').val());
        params.score = parseInt($('#score').text());
        
        if(params.name && params.score) {
            setScores(params);
        }
    });
    
    
});