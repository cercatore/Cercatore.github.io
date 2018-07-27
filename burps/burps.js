
app.controller( "burpsCtrl" , function ($scope, $rootScope, ngProgressFactory, $log, Upload, $http, aracnoService) {
  const cloud = "https://vision.googleapis.com/v1/images:annotate?key=";
  const key = 'AIzaSyAN8SUGdR7A17SCZta40uHajTYhsdOX-po';
  let clientId = "1234567890";
  const geofire_table = 'user_location';
  let self = (this);
  $scope.image = {};
  $scope.file = {};
  self.client =  { clientId, name: "johnny"};
  self.data = {};
  self.amici = {};
  let myloc = [45.38, 160.41];
    
  
  $log.log(self.data);
  $scope.progressbar = ngProgressFactory.createInstance();

  this.save  = () => {
     if (self.client.image === '' ) $scope.user_error = 'error no image';
     
     self.client.name = "fish";
     self.client.image = 'images/marker.png';
     da_newuser();
  }
  this.updateRange = (r)=>{
    console.log("range : " + r);
  }
  
  const feedGoogle = (data) => {
      log( JSON.stringify($rootScope.userLogged))
        $http.post(cloud + key, data )
          .then( (result) => { log(result) })
          .catch( (result) => log( result));
        };
  
  $scope.thecat = "images/thecat.jpg";
  self.testi = [ "Animals - Fauna" , "Mammals", "This cat", "laughing"];
    
  $scope.fatto = (data) => {
    aracnoService.uploadToStorage($scope, clientId, data, 'outUpload', $scope.progressbar);
    
    // alert(reader.result);
      // var content = reader.result.split(',')[1];// or var base64result = reader.result.substr(reader.result.indexOf(',') + 1); reader.result.split(',')[1]; //or var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      // console.log(content.slice(content, 0, 50))

  }
  // Specify the locations for each fish
  let fishLocations = [
    [-16.130262, 153.605347],   // Coral Sea
    [-66.722541, -167.019653],  // Southern Ocean
    [-41.112469, 159.054565],   // Tasman Sea
    [30.902225, -166.66809]     // North Pacific Ocean
  ];

    const mapPromises = ()=> {
      let promises = [];
      fishLocations.forEach( (location, index)=> {
        promises.push( self.geoFire.set("fish" + index, location).then(function () {
      log("fish" + index + " initially set to [" + location + "]");
      }));
    });
    return promises;
    };
    const dummy = () =>{
      self.geoFire.set("fish6", [45, 160]).then(()=>log('cagata2'));
    }
    $scope.setId = (clientId) =>{
      self.clientId = clientId;
      self.client =  { clientId, name: "johnny"};   // TODO ERROR
    }

  function initFire () {
    self.db = firebase.database().ref("/test_db");
    self.afs = firebase.firestore();
    self.geoFire = new GeoFire(self.db.child(geofire_table));
    console.log(self.db);
    
    // if (self.promises === undefined) throw new DOMException("oooooo ooo");
    self.geoQuery = self.geoFire.query({
      center: myloc ,
      radius: 1000000.5
    });
    var onKeyEnteredRegistration = self.geoQuery.on("key_entered", (key, location, distance)=> {
      console.log(key + " entered query at " + location + " (" + distance + " km from center)");
      self.amici[key] = 'zio';
      let amico = {};
      caricaAFS(amico, key);
    });
    self.start = dummy;
    


  }
  initFire();
  function caricaAFS (amico, key) {
    let objref = self.afs.collection('amici').get()
                    .then( query => {
                        query.forEach( function (snap) {
                           let oggetto = snap.data();
                           if (oggetto.clientId === key) {
                            amico.image = oggetto.image;
                            amico.name = oggetto.name;
                            self.amici[key] = amico;
                            console.log(amico);
                           }
                           
                        })
                    })
}



  function buildRequest () {
      let obj = {};
      obj.requests = [];
      obj.requests.push({});
      obj.requests[0].image = {};
      let obj_feat = [];
      obj_feat.push({});
      obj_feat[0].type = 'LABEL_DETECTION';
      obj_feat[0].maxResults = 1;
      obj.requests[0].features = obj_feat;
      return obj;
  }
  const populate = (data)=>{
    let persons = [];
    let item = {};
    item.identity = 'maurilio';
    item.image = 'image1.jpg';

    persons.push(item);
    data.persons = persons;

  }
  populate(self.data);
  function log (what) {$log.log(what);}
  $scope.submit = function () {
    if ($scope.form.file.$valid && $scope.file) {
      $scope.upload($scope.file);
    }
  };
  
  function da_newuser () {
    let userRef = self.afs.collection('amici').doc(self.client.clientId)
      .set(        self.client)
      .then( _ => {});
      console.log("nuovo amico 2 " + userRef);
      self.geoFire.set(self.client.clientId, myloc ).then(function () {
      }, function (error) {
      });
      
  
    
  }
  $scope.aggiornaUser = (a)=>{self.client.image = a};
  $scope.aggiornaUser('');

})

  
// $scope.request = buildRequest($scope.request);
//     log($scope.request);
//     $scope.request.requests[0].image.content = btoa(data);
//     await feedGoogle($scope.request);
    
