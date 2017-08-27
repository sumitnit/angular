//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'allMatch'
        })
        .when('/season/:eplID',{
        	templateUrl     : 'views/season-view.html',
        	controller 		: 'seasonController',
        	controllerAs 	: 'currentSeason'
        })
        .when('/season/:eplId/:code',{

        	templateUrl     : 'views/team-view.html',
        	controller 		: 'teamController',
        	controllerAs 	: 'currentTeam'
        })
        .when('/singlematch',{
            templateUrl     : 'views/single-match.html',
            controller      : 'teamController1',
            controllerAs    : 'currentTeam1'
            
        })
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);