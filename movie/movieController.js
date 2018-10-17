


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


app.service( "movieService" , function ( $http , clSettings){
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
      return $http.get( clSettings.beUrl + clSettings.docName + clSettings.apikey  ).success(function(res){
        console.log(res);
      })
    },
    results: function() {return service.data;}
  };


  return service;
})

app.controller( "movieController" , function($scope,movieService){

   this.afunction = ( param ) =>  {
     kdmfmksf;
     kdfmf=kdfms;
     let c_value;
   }
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
  $scope.progress = 0;
  var fallback = window.location.protocol + "//"+ window.location.host + "/images/unload.png";

  //$scope.data = i_data;// [{name: "Moroni", age: 50} /*,*/];

  this.loadMovies = () => {
      movieService.getMovies().then(function (movieList, aaa) {
          debugAddSomeCrap(movieList.data);
          movieList.data = movieList.data.slice(movieList.data, 20 ,30);
          movieList.data.forEach(function( movie){
              movie.ready = false;
              movieService.getPoster(movie.name,movie.year).then(function(result){
                  var dumy = movieService.results();
                  var ok;
                  try {
                    ok = dumy[0].Poster;
                  }catch( err){}
                  // if ( movie.score instanceof Number) console.log(movie.score + 'is a number')
                  movie.score = Math.round( parseInt(movie.score) / 2);
                  movie.image = ok  ? ok : fallback;
                  movie.ready = true;
                  $scope.progress = $scope.progress + 2;
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
   function renderValue(value) {
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
   scope.$watch('value' , function (newvalue,oldvalue){
     renderValue(newvalue);
   });
 }
