


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
    getPoster: function(name){
      return $http.get(urlPoster + "&s=" + name ).success(function(res){
        angular.copy(res.Search, service.data)
        for (var ii=0; ii< vaiavivere.length; ii++)
          if (name.indexOf(vaiavivere[ii])!==-1) console.log(res);
      })
      .catch(function(error){
         console.log(error)
      })
    },
    getMovies: function(){
      return $http.get("http://localhost/" + "data.json").success(function(res){
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

  //this.loadMovie()

  console.log("ci sono")
  $scope.debug = 0;
  var fallback = "https://picsum.photos/200/300"

  //$scope.data = i_data;// [{name: "Moroni", age: 50} /*,*/];

  this.loadMovies = () => {
      movieService.getMovies().then(function (movieList, aaa) {
          movieList.data.forEach(function( movie){
              movie.ready = false;
              movieService.getPoster(movie.name).then(function(result){
                  var dumy = movieService.results();
                  var ok;
                  try {
                    ok = dumy[0].Poster;
                  }catch( err){}
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
