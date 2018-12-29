
app.controller( "burpsCtrl" , function ($scope, $rootScope, ngProgressFactory, $log, Upload, $http, aracnoService, geoService, $location) {
  const cloud = "https://vision.googleapis.com/v1/images:annotate?key=";
  const key = 'AIzaSyAN8SUGdR7A17SCZta40uHajTYhsdOX-po';
  let clientId = "1234567890";
  let self = (this);
  self.afs = firebase.firestore();
  $scope.image = {};
  $scope.file = {};
  self.client =  { clientId, name: "alberto"};
  self.data = {};
  self.amici = {};

  
  
  $scope.origin = { "x" : 0, "y" : 0};
  self.client.image = window.localStorage.getItem('image');
  console.log("client image is " + self.client.image);
  $scope.progressbar = ngProgressFactory.createInstance();
  //$scope.progressbar.setParent(document.getElementById("anchor_progress"));

  this.save  = () => {
    if (self.client.image === '' ) {
    $scope.user_error = 'error no image';

    // return;
      }
    if (window.localStorage.getItem('chrome')){
    }
    checkUser(); 
    console.log(self.client.clientId + " " + self.client.name);  
    geoService.newUser(self.client, [parseFloat($scope.origin.y), parseFloat($scope.origin.x)]);
  }
  this.updateRange = (r)=>{
    console.log("range : " + r);
  };
  
  const feedGoogle = (data, outputDebug) => {
      let result = {};
      log( "User login status ",  $rootScope.userLogged)
      $http.post(cloud + key, data )
          .then( (response) => { 
              log("actually good");  // qualcosa come result.confidence
              
              return result;
          })
          .catch( (response) => {log( response);
            // TODO something
            result.ordine = "robaccia";
            result.genre = "dog";
            result.tipo = "labra golden";
            if (result.ordine !== "mammals"){
              self.testi = self.retry;
              self.active = true;
            }
            return result;      
            }
          );
      result.ordine = "bigne";
      log("warning hu");
      return result;
  };
  
  $scope.thecat = "images/unload.png";
  self.testi = [ "Animals - Fauna" , "Mammals", "This cat", "laughing"];
  self.retry = ["Uhm, sembra che non sia un cane.", "Ritenta, perfavore","",""];
    
  $scope.fatto = (data) => {
    aracnoService.uploadToStorage($scope, clientId, data, 'out_url', $scope.progressbar);
    
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
  



  function buildRequest (imageUri) {
      let obj = {};
      obj.requests = [];
      obj.requests.push({});
      obj.requests[0].image = { "source": { "gcsImageUri" : imageUri }};
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

  function checkUser () {
    return true;
  }
  this.procedi = () => {
    $location.path('/burp2');
  } 
  
    
  
  $scope.aggiornaUser = (imgUrl, bucket, forestRef)=>{self.client.image = imgUrl;$scope.upload_complete = true;self.client.gcsImage = bucket;
    $scope.recog_in_progress = "wait please, check in progress";
    let sent = buildRequest(self.client.gcsImage);
    $scope.thecat = imgUrl;
    let recog = feedGoogle(sent, "ciao"); // TODO add async for sake of get good data
    var newMetadata = {
      customMetadata: {
        'ordine': recog.ordine,
        'genre': recog.genre,
        "kind": recog.type
      }
    };
    if (recog.ordine !== 'bigne')
      self.testi = self.retry;
      self.active = true;
    forestRef.updateMetadata(newMetadata).then(metadata => {
        log("SAVING RECOG: stored file " + metadata.name + ", " + metadata.contentType + ", customMeta(non null): " + metadata.customMetadata + "(YAY)");
    })

  
  
  
  
  
  };
  
  
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
    
