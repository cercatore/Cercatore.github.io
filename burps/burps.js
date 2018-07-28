
app.controller( "burpsCtrl" , function ($scope, $rootScope, ngProgressFactory, $log, Upload, $http, aracnoService, geoService) {
  const cloud = "https://vision.googleapis.com/v1/images:annotate?key=";
  const key = 'AIzaSyAN8SUGdR7A17SCZta40uHajTYhsdOX-po';
  let clientId = "1234567890";
  let self = (this);
  self.afs = firebase.firestore();
  $scope.image = {};
  $scope.file = {};
  self.client =  { clientId, name: "johnny"};
  self.data = {};
  self.amici = {};
  
  $scope.origin = { "x" : 0, "y" : 0};
  self.client.image = window.localStorage.getItem('image');
  $scope.progressbar = ngProgressFactory.createInstance();

  this.save  = () => {
     if (self.client.image === '' ) {
       $scope.user_error = 'error no image';
       
       //return;
     }
     if (window.localStorage.getItem('chrome')){
       self.client.image = "images/thecat.png";
       self.client.name = "claudio";
       self.client.clientId=clientId;
     }
     checkUser();   
     geoService.newUser(self.client, [parseFloat($scope.origin.y), parseFloat($scope.origin.x)]);
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
  this.knock = (user) => {
      self.afs.collection('amici').doc(user).update({'knock': self.client.clientId});
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
    
    $scope.setId = (clientId) =>{
      self.clientId = clientId;
      self.client =  { clientId, name: "johnny"};   // TODO ERROR
    }

  function initFire () {
    
    geoService.registerQuery(clientId, [0, 0]);

    


  }
  initFire();
  



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
  
  function checkUser () {
    return true;
  }
      
  
    
  
  $scope.aggiornaUser = (a)=>{self.client.image = a};
  $scope.aggiornaUser('');
  $scope.moveMarker = (event) => {
    let y = event.offsetY;
    let x = event.offsetX;
    $scope.origin.x = (x - 350) / 2;
    $scope.origin.y = (y - 150) / 2;
      $('#maker').css('top', y);
      
      $('#maker').css('left', x);
  }
  self.wrap = function () {self.client.image };
});
  
// $scope.request = buildRequest($scope.request);
//     log($scope.request);
//     $scope.request.requests[0].image.content = btoa(data);
//     await feedGoogle($scope.request);
    
