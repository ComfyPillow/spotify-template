var idData;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var artistData = 'https://api.spotify.com/v1/artists/'
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      $scope.tracks = response.tracks.items
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
    var artistID = song.artists[0].id;
    for (i = 0; i < song.artists.length; i++) {
        $http.get(artistData + song.artists[i].id).success(function(response){
          $scope.profile = response;
          var info = $('<li class="name" ng-click="getRelated("' + $scope.profile.id +'");">' + $scope.profile.name + '</li> <img src="' + $scope.profile.images[1].url + '">')
          $('#artistList').append(info);
        })
    }
    $scope.getRelated(artistID);
  }

  $scope.getRelated = function(artistID) {
      $http.get(artistData + artistID + "/related-artists").success(function(response){
        $scope.related = response;
      })
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});