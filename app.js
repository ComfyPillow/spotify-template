var data;
var artistData;
var relatedData;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var artistData = 'https://api.spotify.com/v1/artists/'
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
    })
  }
  $scope.play = function(song) {
    $scope.clicked = true;
    $('#artistList').empty('');
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
  $scope.artistInfo = function(song) {
    for (i = 0; i < song.artists.length; i++) {

        $http.get(artistData + song.artists[i].id).success(function(response){
          $scope.profile = response;
          var info = $('<li class="name">' + $scope.profile.name + '</li> <img src="' + $scope.profile.images[1].url + '" ng-click="getRelated("' + $scope.profile.id +'");">')
          $('#artistList').append(info);
        })
    }
      /* $scope.artists = song.artists;
      $http.get(artistData + song.artists[0].id).success(function(response){
        $scope.image = response.images[1].url;
      }) */
  }

  $scope.getRelated = function(id) {
    console.log(id);
    /*$http.get(artistData + id).success(function(response){
        relatedData = $scope.images = response.images;
        return relatedData.images[1].url;
    })*/
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});