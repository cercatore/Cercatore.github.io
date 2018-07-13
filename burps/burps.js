
app.directive("clUpload" , function ($parse) {
    return {
        restrict: "EA",
        template: "<input type='file' />",
        replace: true,
        link: function (scope, element, attrs) {

            var modelGet = $parse(attrs.fileInput);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);

            var updateModel = function () {
                scope.$apply(function () {
                    modelSet(scope, element[0].files[0]);
                    var reader = new FileReader();
                    reader.onloadend = function (result){
                      console.log('done')
                      scope.done(reader.result);
                    }
                    reader.readAsBinaryString(element[0].files[0]);





                    onChange(scope);
                });
            };

            element.bind('change', updateModel);
        }
    };
    
});


app.controller( "burpsCtrl" , function ($scope, ngProgressFactory){
  const cloud = "https://vision.googleapis.com/v1/images:annotate?key=";
  $scope.image = "";
  $scope.done = (data)=>{
    console.log("result not encoded : "    + data)
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.start();

    // alert(reader.result);
      // var content = reader.result.split(',')[1];// or var base64result = reader.result.substr(reader.result.indexOf(',') + 1); reader.result.split(',')[1]; //or var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      // console.log(content.slice(content, 0, 50))

  }



})
