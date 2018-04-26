app.controller("batch" , function($scope, $http){

      let folder = "test01";
      var url = 'https://api.mlab.com/api/1/databases/cbmanager/collections/';
      api = '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf';

      $scope.data
      var uploadTotal
      var cc = 0; // progress
      function initLoadCSV(){
           $http.get("http://localhost" + "/" + "data.json").then(response => { $scope.data = response.data;$scope.uploadTotal=$scope.data.length})
      }
      initLoadCSV();





})
