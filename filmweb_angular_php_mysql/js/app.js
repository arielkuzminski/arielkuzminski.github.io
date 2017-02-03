var app = angular.module( 'myApp', ['ngRoute'] );

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/content.html',
            controller: 'showMoviesController'
        })
        .when('/movie/:id', {
            templateUrl: 'views/movie.html',
            controller: 'userController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller( 'showMoviesController', ['$scope', '$filter', 'orderByFilter', '$http', '$routeParams', '$log', function($scope, $filter, orderByFilter, $http, $routeParams, $log) {
    
    $scope.current = {};
    $http({ 
        url: './json.php', 
        method: 'GET', 
        dataType: 'json', 
        params: { action: 'show', id: $routeParams.id } 
    }).then(function(data) {
        $log.info(data.data);
        $scope.movies = data.data.posts;
        $scope.current = { id: 0, mov: $scope.movies[0]};
        console.log($scope.current);
    }, function(data) {
        alert('qwe');
    });
    
    
//     var url = '//localhost/1/json.php';      
//        $.ajax({
//            type: 'GET',
//            dataType: 'json',
//            url: url,
//            data: {
//                action: 'show'
//            },
//            success: function(data) {
//                console.log('AJAX dziala');
//                $scope.movies = data.posts;
//                $scope.current = { id: data.posts[0].id, mov: $scope.movies[0] };
//                console.log($scope.current);
//            },
//            error: function() {
//                console.log('AJAX ERROR');
//            }
//        });
        
    
    /*
    $scope.movies = [
    { title: 'Pulp Fiction' , description: 'Strzelają i przeklinają', lasts: 147, year: 1994, type: 'movie', poster: "img/img-pulp-fiction.png" },
    { title: 'Przyjaciele' , description: 'piją kawę i takie tam', lasts: 47, year: 1993, type: 'show', poster: "img/img-friends.png"  },
    { title: 'Angular Tutorial' , description: 'Bawi i uczy', lasts: 30, year: 2016, type: 'show', poster: "img/img-angular.png"  },
    { title: 'Szeregowiec Ryan' , description: '10 typów się poświęca by uratować 1 typa', lasts: 120, year: 2001, type: 'movie', poster: "img/img-szeregowiec-ryan.jpg"  },
    { title: 'Władca Pierścieni' , description: 'Idą, idą i idą', lasts: 230, year: 2002, type: 'movie', poster: "img/img-wladca-pierscieni.jpg"  },
    ];*/
    
    
    $scope.showMovie = function(i, mov) {
        $scope.current = { id: i, mov: $scope.movies[i] };
        
    }
    
    
    $scope.next = function() {
        var max = $scope.movies.length;
        if($scope.current.id < max - 1) {
            $scope.current = { id: $scope.current.id + 1, mov: $scope.movies[$scope.current.id + 1] };
//            console.log('---');
//            console.log($scope.current);
//            console.log('---');
        }
    }    
    
    $scope.previous = function() {
        var max = $scope.movies.length;
        if($scope.current.id > 0) {
            $scope.current = { id: $scope.current.id - 1, mov: $scope.movies[$scope.current.id - 1] };
        }
    }
    
    $scope.sortOrder = true;
    $scope.sortMovies = function( sort ) {
        $scope.movies = orderByFilter($scope.movies, sort, $scope.sortOrder);
        $scope.sortOrder = ($scope.sortOrder) ? false : true;
    }
    
     } ] );
    
app.controller( 'AddMoviesController', ['$scope', '$filter', 'orderByFilter', '$http', '$routeParams', '$log', function($scope, $filter, orderByFilter, $http, $routeParams, $log) {
    
    
    $scope.checkIfOk = function() {
        if($scope.movieTitle && $scope.movieDesc && $scope.movieDuration && $scope.movieYear &&$scope.movieType) {
            $scope.addMovies();
        }
    }
    
    
    $scope.addMovies = function() {
        
        $http({ 
        url: './json.php', 
        method: 'POST', 
        dataType: 'json', 
        params: { action: 'add', 
                 title: $scope.movieTitle,
                 description: $scope.movieDesc, 
                 lasts: $scope.movieDuration, 
                 year: $scope.movieYear, 
                 type: $scope.movieType,
                 image: $scope.movieImage || "img/img-no-image.png"
                },
    }).then(function(data) {
            
    }, function(data) {
        alert('error');
    });
        
        var newMovie = { title: $scope.movieTitle,
                         description: $scope.movieDesc, 
                         lasts: $scope.movieDuration, 
                         year: $scope.movieYear, 
                         type: $scope.movieType,
                         image: $scope.movieImage || "img/img-no-image.png"
                       };
        
        $scope.movies.push(newMovie);
        
    };
    
} ] );
    
   



                                 
    