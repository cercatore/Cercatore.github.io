
angular.module('myApp.costanti', [])
.constant('clSettings', {
    beUrl:      'https://api.mlab.com/api/1/databases/cbmanager/collections/',
    docName: 		 'test03',
    apikey:      '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf',

    otherSetting: 'XYZ',
    squadre_serie_a: ["SELEZIONA...", "ATALANTA", "BOLOGNA", "CAGLIARI", "CHIEVO", "EMPOLI", "FIORENTINA", "FROSINONE", "GENOA", "INTER", "JUVENTUS", "LAZIO", "MILAN", "NAPOLI", "PARMA", "ROMA", "SAMPDORIA", "SASSUOLO", "SPAL", "TORINO", "UDINESE"],
    routes,
    labels: {
        title: "HINT DIALOG",
        "ITA": {
            tutorial_text: "Lorem ipsum dolor sit amet, nec cu ullum feugait commune, in equidem tractatos complectitur vel. Te mazim reprehendunt vim, gloriatur conceptam vis et. Ex latine aeterno deleniti mei, oratio debitis temporibus quo an. Vim omittam reformidans at."

        },
        "EN": {
            tutorial_text: "blabla"
        }

    },
    scambioCerca:[],

});

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
                console.log(element.offsetWidth);
                   
                element.bind( 'click', function (event) {
                    console.log(event.offsetX);
                    scope.$apply(scope.moveMarker(event));
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
