'use strict'

app.controller('capsCtrl' , function( $scope, $http , aracnoService){
    self = this;
    this.worker = 0;
    self.$http = $http;
    aracnoService.init( $scope);
    let done = 0;
    var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAdi_Ooy-2BBYZDZqbUnBVIitdJqy5iSHY&cx=017647395095094430655:fnpg3-mpcs0&q=";
    let pool = new ThreadPool(200);
    function processa(){
        done = 0;self.worker = 0;

        let data = $scope.out;
        console.log(data.length + " self.workers.")
        for (let i = 0 ; i < data.length; i++){
            let _id = "***** " + i;
            let param = {};
            param.inject =  angular.injector(['ng']);
            param.input = data[i].value
            pool.run( pioggia , param)
              .done(function(result){
                  log(result);done++});

        }
    }

    $scope.vai = () => { processa();}
    function pioggia (param,done) {
      self.worker = self.worker +1;
      let results = 0;
      try{
        let input = param.input;
        var $http = param.inject.get('$http');
        $http.get( url + input )
          .then((result)=>{
              if (result.searchInformation.totalResults > 0 )
                results = 1;


          })
          .catch((error, status) =>{
              log(error + "" + status , 1);
          })
        done("exit " + self.worker + " with value " + param + ", ottiene " + results );
      }catch(err){ console.log("error on " + param + ". " + err)}
    


function log(text, param){
  if (param === 1)
    $scope.debug += '<div style="color:red">' + text + '</div><br/>';
  else $scope.debug += text + '<br/>'
}
})
