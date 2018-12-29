/*******************************************
*
*
*********************************************/

var app = angular.module('myApp',
	[
	'myApp.chat',
	'ngRoute',
	'ngMessages',
	'ngAnimate',
	'shared',
	'firebase',
	'ngProgress',
	'ngFileUpload',
	'hl.sticky',
	'myApp.costanti'

	//'ngTable'

	])

var user;


// const setLocalStorageItem = Cl(prop, value) => {
// 	localStorage.setItem(prop, value);
// });

// const getLocalStorageItem = ClientFunction(prop => {
// 	return localStorage.getItem(prop);
// });
app.factory('BearerAuthInterceptor', function ($window, $q, $location) {
    return {
        request: function(config) {
				config.headers = config.headers || {};
				console.log(config.headers);
		    if (window.localStorage.getItem('token')) {
              // may also use sessionStorage
				config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
											//
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
				//  Redirect user to login page / signup Page.
				$location.path('/404');
            }
            return response || $q.when(response);
        }
    };
});

// Register the previously created AuthInterceptor.

let token;
app.controller('homeController' , function ($rootScope, $scope, $firebaseAuth , $location){
	this.dataData = {};
	var auth = $firebaseAuth();
	this.hasFinished = 'non voglio vivere cosi cerca qualcosa';
	this.signInNormal = (user ) => {
		auth.$signInWithEmailAndPassword(user.email, user.password)
			.then(
				function(firebaseUser){
					$rootScope.rightPath = "signedin";
					$rootScope.userLoggedIn = firebaseUser.email;
					$rootScope.token = user.getToken();
					window.localStorage.setItem('token' , $rootScope.token);
					console.log("changed");
					user = firebaseUser;
					$location.path('/lista_portate')
				  console.log("Signed in as:", firebaseUser.uid);
				}
			)

			.catch(function (error) {
				console.log("athentication error " + error )
				$location.path('/500');
			})
		}
this.signInFacebook = () => {
		auth.$signInWithPopup("facebook").then(function(firebaseUser) {
			//TODO $rootScope.user = firebaseUser.uid;
	 console.log("FB Signed in as:", firebaseUser.uid);
 }).catch(function(error) {
	 console.log("FB Authentication failed:", error);
 });
}

this.signInGoogle = () => {
		auth.$signInWithPopup("google").then((firebaseUser)=>{
		console.log("G+ Signed in as:", firebaseUser.uid);
	}).catch(function(error) {
 	 console.log("G Authentication failed:", error);
  });
}
$rootScope.logout = function(){
	auth.$signOut().then(function() {
			// Sign-out successful.
			$rootScope.rightPath = false;
			$rootScope.userLoggedIn = 'ciao';
			$location.path('500')
		}, function(error) {
			// An error happened.
		});
	}



})
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

// firebase.auth().onAuthStateChanged(function(_user) {
// 	user = _user
//   if (user) {
//     //alert("user signed in")
// 		var check = angular.element(document).scope().rightPath;
// 		if ( check !== undefined && check !== '');
// 			// else window.location.href = "http://" + window.location.hostname + "/404"
// 		angular.element(document).scope().userLogged = "Ciao " + user.email;

// 		var newtoken = user.getIdToken().then(function (data) { window.localStorage.setItem('token', ("" + data).trim());
// 		console.log("****************** loggedIN changed ");})

//   } else {
// 		try{
// 			angular.element(document).scope().userLogged = "perfavore fai login";

// 		}catch(err){}
//     console.log("**************** out");
//   }
// });

function getNext(){
	return new Date().getTime()
}



app.value('categorieHC' , [ "FIRST COURSE" , "SECOND COURSE" , "SIDE DISHES" , "BEVERAGES"]);


app.factory("aracnoService" , function( $http, $location){
	let service = {};
	function mastica(data) {
		 let obj = [];
		 for(let i=0;i<data.length;i++){
				let tmp = {};
				tmp.value = data[i].name;
				obj.push(tmp);
			}
			return obj;
	}
	service.init = ( sacco ) =>{
		$http.get(window.location.protocol + '//' + window.location.host + "/" + "data.json" ).
		then(response => {
			sacco.arrayData = response.data;
			sacco.out = mastica(sacco.arrayData);
			sacco.status = "done.42";
		});

	}

	service.uploadToStorage = ( sacco, clientId, data, propName, prog)  => {

		let ref = firebase.storage().ref().child(clientId + '-images').child(data.name );
		var metadata = {
			contentType: 'image/*',
			"claudio" : data.name
		  };
		sacco.uploading = 1;

		let task = ref.put(data) // TODO: lasc\iare in bianco
		prog.set(19);
		// was prog.start(): fixed time increase
		task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'

		function(snapshot) {
		  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress.toFixed(0) + '% done');
			sacco.profile_identify = 'images/paperino.png';

		  switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSED: // or 'paused'
			  console.log('Upload is paused');
			  break;
			case firebase.storage.TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				prog.set( progress.toFixed(0) );
			  break;
		  }
		}, function(error) {

		// A full list of error codes is available at
		// https://firebase.google.com/docs/storage/web/handle-errors
		switch (error.code) {
		  case 'storage/unauthorized':
			// User doesn't have permission to access the object
			break;

		  case 'storage/canceled':
			// User canceled the upload
			break;
	  	case 'storage/unknown':
			// Unknown error occurred, inspect error.serverResponse
			break;
		default:console.log("error " + error.code);
		}
	  }, function() {
		// Upload completed successfully, now we can get the download URL
		task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		  console.log('File available at', downloadURL);
			let ref = task.snapshot.ref;
			let bucket = "gs://" + ref.location.bucket + "/" + ref.location.u;
			sacco.aggiornaUser(downloadURL, bucket, ref);
			console.log("bucket is " + bucket);
			window.localStorage.setItem('image', downloadURL);
			sacco[propName] = downloadURL;
			prog.set(100);

		});
	  });

	}
	return service;
})
app.factory("services", ['$http' , "clSettings", function($http , serviceBase ) {
  var docName = "portate"
    var obj = {};
	//if (!ss ) alert("goes wrong");
	obj.insertPortata = function (customer) {
		var notify = $("div[ajax-result]");

		return $http.post(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , customer)
			.success(function (data, status, headers, config) {
				$("[ajax-prog]").hide();
				notify.show();
				notify.html("<div class='center-block'><h3>CARICAMENTO CON SUCCESSO</h3></div>")
				window.setTimeout(function (){
					notify.hide();
				},2000)
				//alert(JSON.stringify(data))
			})
			.error(function (data, status){
				alert(status)
			})
			.complete(function (){
				$("[ajax-prog]").show();
			})
		};
	obj.getAllPortate = function(){

		return $http.get(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf')
			.error(function (data, status){
					alert(status)
			})
		}
	obj.getPortata = function(customerID){
        return $http.get(serviceBase + docName+ '/' + customerID + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf');
    }
	obj.getPortateCategoryFilter = function(category){
		var q={"category": category };
		return $http.get(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf&q=' + angular.toJson(q) )
		.error(function (data, status){
					alert(status + "\n " + JSON.stringify(data) )
			})
		}
	obj.catArray = [ "PRIMI" , "SECONDI" , "CONTORNI" , "BIBITE"];

	obj.insertComanda = function(itemComanda){
        return $http.post(serviceBase + 'comande' + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , itemComanda)
			.error( function ( data, status) {
				alert(status)
            })
	}

	return obj;

}])


app.controller('loginCtrl',  function ($rootScope, $scope, $location, $routeParams)  {
	$scope.loginStatus = "Sign In";
	$scope.user = "you are claudio"
	$scope.authenticate = function(user){
		firebase.auth().signInWithEmailAndPassword(user.name, user.pass).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert (error.message + "\n" + error.code)
		  // ...
		})
		$location.path('/lista_portate')
	}




});

var routes = [ "/burp" , "/home" , "/movies" , "/chat" , "/batch", "/kikass"];

app.config(
  function($routeProvider, $httpProvider) {
		  //alert ("useXDomain prop is " + $httpProvider.defaults.useXDomain)
	// $httpProvider.interceptors.push('BearerAuthInterceptor'); // WARNING REMOVED TODO:
	// $httpProvider.defaults.headers.get = { 'accept' : 'application/json' }
	let headers = [];
	// headers.push( { 'Access-Control-Allow-Origin' : 'http://127.0.0.1:5005' }); 
	// $httpProvider.defaults.headers.common = headers;
		
    $routeProvider.
      when('/comanda', {
			title:"PRFESSIONAL HOME PAGE DEVELOPER CLAUDIO",					// title: 'LOGIN',
			templateUrl:"/partials/comanda/comanda_new.html",			// templateUrl: 'login.html',
			controller:"comandaCtrl"					// controller: 'loginCtrl'
      })
	  .when('/lista_portate', {
		title: 'visualizza admin portate',
		templateUrl: 'partials/viewPortata/list_portate.html',
        controller: 'portateCtrl'
	  })
      .when("/admin", {
		title: 'Form Prodotto',
		templateUrl: 'partials/portata/admin_portata.html',
		controller: 'addProductCtrl'

	  })
	  .when('/login', {
			title: 'LOGIN',
			templateUrl: '/login.html',
			controller:"loginCtrl"					// controller: 'loginCtrl'
      })
	  .when( routes[1], {
			title : 'NUTELLA',
			templateUrl: 'homeComponent/home.html',
			controller : 'homeController'

		})
		.when( routes[2] , {
		 		title: 'blabla',
			  templateUrl: 'homeComponent/404.html',
		})
		.when( '/500' , {
				title: '500',
				templateUrl: 'homeComponent/500.html'
		})
		.when( routes[3], {
			title:'chat',
			templateUrl: 'chat/room.html',
			controller: 'chatController as control'
		})
		.when( routes[6], {
			title:"",
			templateUrl: 'zombie/esaurito.html',
			controller: 'zombieCtrl as main'
		})
		.when( '/movie' , {
			title:'my obiettivo',
			templateUrl: 'movie/movieDetail.html',
			controller: 'movieController as ctrl'
		})
		.when( '/bah', {
			templateUrl:"movie/batch.html",
			controller:'batch as ba'
		})
		.when('/burp', {
			templateUrl:"burps/burps.html",
			controller:'burpsCtrl as main'
		})
		.when('/burp2', {
			templateUrl:'burps/animalmap.html',
			controller:'burpsCtrl as main'
		})
		.when('/kikass', {
			templateUrl:'kikass/kikass.html',
			controller:'kikass as main'
		})

    .otherwise({
        redirectTo: '/kikass'
    });
});

function printString(string, delay){
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          console.log(string)
          resolve()
        },
        delay + 1
      )
    })
  }
const waitaminuteDone = async() =>{
	await printString("1111111", 300);
	$rootScope.app_loading = 'ok load';

}

app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.loginActions  = [ 'LOGIN'];
	$rootScope.splashLoad = true;
	console.log(routes[1])
	$rootScope.route_1 = routes[0].replace('/','#');
	$rootScope.route_2 = routes[1].replace('/','#');
	$rootScope.route_3 = routes[2].replace('/','#');
	$rootScope.route_4 = routes[3].replace('/','#');
	$rootScope.route_5 = routes[5].replace('/','#');

	if (user) {
		$rootScope.loginStatus = "VAI DOVE VUOI";
		const user = firebase.auth().currentUser;
		$rootScope.userLogged = user.getToken();

				// if (user){ // getProfile
					// $rootScope.loginActions = [  "CONTACT", 'EMAIL', 'EDIT PICTURE', 'LOGOUT']
					// $rootScope.loginStatus = ( user.displayName ? user.displayName : user.email )
				// }
				// else {
					// $location.path("/login");
					// $rootScope.pusherOut = "Please login fucker...";
				// }

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
		});
	}
		else{
			//$location.path('/404');
		}
	$rootScope.$on('$routeChangeError', function (event, current, previous) {
		$location.path('/404');
	});
}]);
