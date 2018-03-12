app.controller( "movieController" , function($scope){
  this.search = { "select" : "" , "term" : ""}
  this.done = (search) => {
    alert("serarch " + search.genre + ", " + search.term)
  }

  this.optionYears = [ "2017","2018", "2016"]
  this.optionGenre = [ "LOTR","PEACE", "DONNE"]

})
