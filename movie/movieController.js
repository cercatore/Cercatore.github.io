


// class Movie {
//
//   genre:string;
//   star:string; //imdb rating
//   name:string;
//   year:number;
//   durate:string;
//   // later
//   // rating

// }
var vaiavivere = ["cliente"];

app.service( "movieService" , function ( $http){
  var urlPoster  = "http://www.omdbapi.com/?&apikey=e37bd99c"
  var service = {
    data:[],
    getPoster: function(name, year){
      return $http.get(urlPoster + "&s=" + name + "&y=" + year ).success(function(res){
        angular.copy(res.Search, service.data)
        for (var ii=0; ii< vaiavivere.length; ii++)
          if (name.indexOf(vaiavivere[ii])!==-1) console.log(res);
      })
      .catch(function(error){
         console.log(error)
      })
    },
    getMovies: function(){
      return $http.get("http://localhost:3000/" + "data.json").success(function(res){
        console.log(res);
      })
    },
    results: function() {return service.data;}
  };


  return service;
})

app.controller( "movieController" , function($scope,NgTableParams,movieService){


  self = (this)
  this.afs = firebase.firestore();

  this.setupMovie = () =>{
    movies.forEach(function(movie){
      self.afs.collection('movies').doc(getNext()).set(movie);
    })
  }
  function debugAddSomeCrap( crap){
    item = {};
    item.name = 'adaline';
    item.score = '1';
    item.year = 2015
    crap.push(item);
  }
  //this.loadMovie()

  console.log("ci sono")
  $scope.debug = 0;
  var fallback = "https://picsum.photos/200/300"

  //$scope.data = i_data;// [{name: "Moroni", age: 50} /*,*/];

  this.loadMovies = () => {
      movieService.getMovies().then(function (movieList, aaa) {
          debugAddSomeCrap(movieList.data);
          movieList.data.forEach(function( movie){
              movie.ready = false;
              movieService.getPoster(movie.name,movie.year).then(function(result){
                  var dumy = movieService.results();
                  var ok;
                  try {
                    ok = dumy[0].Poster;
                  }catch( err){}
                  movie.score = Math.round(movie.score / 2);
                  movie.image = ok  ? ok : fallback;
                  movie.ready = true;
              })
          })
          $scope.data = movieList.data;
      })
  }
  this.loadMovies();


  // })
  // console.log("here")
  // movieService.getData($defer,params).then(function(){
  // //  $scope.tableParams.settings({data:data})



})

app.directive('clRating', function(){
  return {
  restrict: 'EA',
    scope: {
      'value': '=value',
    },
    link:linkFunc,
    template: '<span ng-class="{isReadonly: isReadonly}">' +
      '<i ng-class="renderObj" ' +
      'ng-repeat="renderObj in renderAry"> ' +
      '</i>' +
      '</span>',
      replace: true
  }
});
function linkFunc(scope, element, attrs) {
   if (scope.max === undefined){
     scope.max = 5; // default
   }
   console.log(scope.value);
   function renderValue() {
     scope.renderAry = [];
     for (var i = 0; i < scope.max; i++) {
       if (i < scope.value) {
         scope.renderAry.push({
           'fa fa-star fa-2x yellow': true
         });
       } else {
         scope.renderAry.push({
           'fa fa-star-o fa-2x yellow': true
         });
       }
     }
   }
   renderValue();
 }
