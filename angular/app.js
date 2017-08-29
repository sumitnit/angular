

var myApp = angular.module('eplApp',['ngRoute']);


myApp.service('myservice',function(){
  var _xxx = {};
return {
    getXxx: function () {
        return _xxx;
    },
    setXxx: function (value) {
        _xxx = value;
    }
};
})// end of myservice

myApp.controller('mainController',['$http',function($http){

var main=this;
this.allseason=[];
this.allmatches=[];
this.baseUrl='https://raw.githubusercontent.com/openfootball/football.json/master';

this.loadAllseasons=function(){
	$http({
		method:'GET',
		url : main.baseUrl+'/2015-16/en.1.json'}).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log('1st season');
          var i=response.data.name;
          i=i.replace("/","-");
          main.allseason.push(i);
          main.allmatches.push(response.data);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });
    $http({
      method:'GET',
      url:main.baseUrl+'/2016-17/en.1.json'}).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response.data.name);
          var i=response.data.name;
          i=i.replace("/","-");
          main.allseason.push(i);
          main.allmatches.push(response.data);
          console.log(main.allmatches);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
}
this.loadAllseasons();
}]);

// end of mainController

myApp.controller('seasonController',['$http','$routeParams',function($http,$routeParams)
{
  var main=this;
  this.eplName=$routeParams.eplID;
  this.eplID=$routeParams.eplID.substring(23);
  this.seasonMatch=[];
  this.teams=[];
  this.baseUrl='https://raw.githubusercontent.com/openfootball/football.json/master';
  this.seasonview=function(){
  $http({
    method:'GET',
    url : main.baseUrl+'/'+main.eplID+'/en.1.json'}).then(function successCallback(response) {
          main.seasonMatch=response.data;
          for (var i = 0; i < main.seasonMatch.rounds[0].matches.length; i++) {
            main.teams.push(main.seasonMatch.rounds[0].matches[i].team1.code);
            main.teams.push(main.seasonMatch.rounds[0].matches[i].team2.code);
          }
          console.log(main.teams);
        }, function errorCallback(response) {
          alert("some error occurred. Check the console.");
          console.log(response);
        });
        }// end of seasonview
        this.seasonview();
}]);
//end of seasonController


myApp.controller('teamController',['$http','myservice','$routeParams',function($http,myservice,$routeParams){
      var main= this;
      this.code=$routeParams.code;
      this.eplID=$routeParams.eplId.substring(23);
      this.allMatch=0;
      this.matchWin=0;
      this.matchLose=0;
      this.matchDraw=0;
      this.seasonMatch=[];
      this.teamName='';
      this.teamMatch=[];
      this.totalScore=0;
      this.baseUrl='https://raw.githubusercontent.com/openfootball/football.json/master';
      this.teamView=function(){
        $http({
          method:'GET',
          url : main.baseUrl+'/'+main.eplID+'/en.1.json'}).then(function successCallback(response) {
            main.seasonMatch=response.data.rounds;
            //console.log(main.seasonMatch);
        }).then(function matchdetails(){
          var x=main.seasonMatch;
        for (var i = 0; i < x.length; i++) 
        {
          for (var j = 0; j <x[i].matches.length;j++)
          {
                if(x[i].matches[j].team1.code==main.code || x[i].matches[j].team2.code==main.code )
                {

                    main.allMatch++;
                    main.teamMatch.push(x[i].matches[j]);
                    if (x[i].matches[j].team1.code==main.code) 
                    {
                      if (x[i].matches[j].score1>x[i].matches[j].score2) 
                      {
                        main.matchWin++;
                      }
                      else if (x[i].matches[j].score1==x[i].matches[j].score2) 
                      {
                        main.matchDraw++;
                      }
                      else
                      {
                        main.matchLose++;
                      }
                    }
                    if (x[i].matches[j].team2.code==main.code) 
                    {
                      if (x[i].matches[j].score2>x[i].matches[j].score1) 
                      {
                        main.matchWin++;
                      }
                      else if (x[i].matches[j].score2==x[i].matches[j].score1) 
                      {
                        main.matchDraw++;
                      }
                      else
                      {
                        main.matchLose++;
                      }
                    }
                }
          }
        }
        console.log(main.teamMatch);
        console.log(main.matchWin);
        console.log(main.matchDraw);
        console.log(main.matchLose);
        }).then(function AddToService(){  
        myservice.setXxx(main.seasonMatch);
        console.log(myservice.getXxx());  
      })};


      this.teamView();
      
}]);//end of teamController


myApp.controller('teamController1',['myservice',function(myservice){
  console.log(myservice.getXxx());
}]);//end of teamController1