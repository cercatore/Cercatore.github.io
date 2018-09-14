app.factory('geoService' ,  function($rootScope,$log){
	let service = {}
	let self = this;
	self.db = firebase.database().ref("/test_db");
	self.afs = firebase.firestore();
	const geofire_table = 'user_location';
	self.geoFire = new GeoFire(self.db.child(geofire_table));
	$rootScope.amici = {};
	
	service.registerQuery = ( clientId, myLoc  ) => {
		    if (!myLoc) myLoc = self.loc;
			self.geoQuery = self.geoFire.query({
					center: myLoc,
					radius: 0.01,
			});
			var onKeyEnteredRegistration = self.geoQuery.on("key_entered", (key, location, distance)=> {
					console.log(key + " entered query at " + location + " (" + distance + " km from center)");
					let amico = {};
					caricaAFS(amico, key);
					$rootScope.hasDone = true;
			
			});
	}

	function caricaAFS (amico, key) {
			let objref = self.afs.collection('amici').get()
											.then( query => {
													query.forEach( function (snap) {
														 let oggetto = snap.data();
														 if (oggetto.clientId === key) {
															amico.image = oggetto.image;
															amico.name = oggetto.name;
															$rootScope.amici[key] = amico;
															console.log(amico);
														 }
														 
													})
											})
	}
	service.newUser = ( client , myLoc = [0, 0]) => {
		self.loc = myLoc;
		let userRef = self.afs.collection('amici').doc(client.clientId)
		.set(        client)
		.then( result => {console.log('fine')});
		console.log("nuovo amico 2 " + client.clientId);
		self.geoFire.set(client.clientId, myLoc ).then(function () {
		}, function (error) {
		});
		self.afs.collection('amici').doc(client.clientId).onSnapshot((changes)=>
		console.log( changes))
	}
	return service;


} )