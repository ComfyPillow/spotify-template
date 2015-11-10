/*  George Ng
  INFO 343 C

  This is the javascript file used to handle the various angular functions of the
  spotify song reference and related artists website.*/

var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var artistData = 'https://api.spotify.com/v1/artists/'
var myApp = angular.module('myApp', [])

//This controller grabs the intial searched track data from spotify.
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      $scope.tracks = response.tracks.items
    })
  }

  //This function plays/pauses the music upon clicking the listed songs. 
  $scope.play = function(song) {
    $scope.clicked = true;
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

  //This function gets the song data such as artist names and albums. 
  $scope.artistInfo = function(song) {
    $scope.song = song;
    $scope.artists = song.artists;
    data = song.artists[0].id;
  }

  //This function gets the related artist data for the selected artist.
  $scope.getRelated = function(artistID) {
      $http.get(artistData + data + "/related-artists").success(function(response){
        $scope.related = response;
      })
  }
})