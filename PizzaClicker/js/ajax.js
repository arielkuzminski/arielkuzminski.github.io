$(document).ready(function(){

    var params = {
        name : name,
        score : parseInt($('#score').text())
    }

    $('#myBtn').on('click', function() {
        getScores(params);
    });

    let database = firebase.database();

	function getScores(){
        let scoreReference = firebase.database().ref();
        scoreReference.on('value', (snapshot) => {
            let received = snapshot.val();
            received = Object.values(received);
            received.sort((a, b) => b.score - a.score);
            createList(received);
        });
    };

    function setScores(params) {
        firebase.database().ref().push({
            username: params.name,
            score: params.score
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
            for(var i = 1; i <= 10; i++) {
                p += '<li>' + i + '.' + '</li>';
            }
            p += '</ul>';
            p += '</div>';

            p += '<div class="col-xs-4 userName">';
            p += 'Gracz:';
            p += '<ul class="list-unstyled">';
            for(var i = 0; i < 10; i++) {
                p += '<li>' + received[i].username + '</li>';
            }
            p += '</ul>';
            p += '</div>';

            p += '<div class="col-xs-4 userScore">';
            p += 'Wynik:';
            p += '<ul class="list-unstyled">';
            for(var i = 0; i < 10; i++) {
                p += '<li>' + received[i].score + '</li>';
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