function blavla(postData){
  fetch( "http://aaa.com" , {
    method: "post",
    body: JSON.stringify(postData)
  })
}

async function fetchAsync (url , postData) {
  // await response of fetch call
  let response = await fetch('https://api.github.com');
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

app.controller("batch" , function($scope, $http){

      let folder = "test01";
      var url = 'https://api.mlab.com/api/1/databases/cbmanager/collections/';
      api = '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf';

      $scope.data
      var uploadTotal
      var cc = 0; // progress
      function initLoadCSV(){
           $http.get("http://localhost" + "/" + "data.json").then(response => { $scope.data = response.data;$scope.uploadTotal=$scope.data.length;})
      }
      initLoadCSV();

      complete = () => {
        console.log("complete.")

      }
      $scope.upload = () => {
        async blavla($scope.data);
        return complete;
      }





})
