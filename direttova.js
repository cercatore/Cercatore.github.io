
app.directive('clNavbar', function() {
    return {
            restrict: 'E',

            templateUrl: 'partials/navbar.html'
        }
    })
app.directive('myAweUseless', function() {
    return {
            restrict: 'E',
            template: '<div class="map"></div>',
            link: function ( scope, element, attrs) {
                element.bind( 'mouseup', function (event) {
                    scope.$apply(scope.moveMap());
                    event.preventDefault();
                });
            }
    }
})

app.directive("clUpload", function ($parse) {
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
                    reader.onloadend = function (result) {
                      console.log('chiamata done');
                      try {  // attenzione sto passando il rif e il nome del file , non piu dati
                        
                        scope.fatto( element[0].files[0]);
                      }catch(ex){console.log(ex);throw new DOMException("call to undefined method done in scope. implement it?")}
                    };
                    reader.readAsBinaryString(element[0].files[0]);





                    onChange(scope);
                });
            };

            element.bind( 'change', updateModel);
        }
    };
});
