var cc=0;
  angular.module('myApp.chat' ,['ngMessages'] )
    .controller('chatController', function($scope, $interval, $timeout){
        self = (this)
        this.afs = firebase.firestore();
        self.presence = {};
        $scope.extra_data=[];
        $scope.messages = [];
        this.addMessage = function(){
          if (!self.connected) $scope.chat_error='disconnected' //TODO else
          if (self.presence){
            var conversRef = self.afs.collection('convers').doc($scope.currentId)
            msg_id = 'a' + getNext();
            message_t = [];
            conversRef.update({messages:message_t});
            conversRef.collection('messages').doc(msg_id).set({
                zdate : getNext(),
                'sender': self.user,
                'rcpnt' : self.partner,
                text : self.text
              })

          }//else logerror

        }
        $scope.alert = (txt) =>{
          alert(txt)
        }
        this.processMessages = function(event){
          console.log('YAY')
        }
        let scrolled = false;
        function updateScroll(element){
          if(!scrolled){
            let opt = {
              top: element.scrollHeight,
              left:0,

            }
              element.scrollIntoView(opt);
          }
        }
        this.registerMessageListener = function(roomId){
          messageRef = self.afs.collection('convers').doc(roomId).collection('messages')
          roomRef = self.afs.collection('convers').doc(roomId)
          messageRef.onSnapshot(function(doc){
              console.log("room:" + roomId + " updating")
              self.afs.collection('convers').doc(roomId).collection('messages')
                .orderBy('zdate')
                .get()
                .then((query)=>{
                    $scope.currentChat.messages = [];
                    query.forEach(function(item){
                      var item = angular.copy(item.data())
                      item['date'] = new Date(item.zdate);
                      nitem = {};
                      nitem[getNext()] = item;
                      $scope.currentChat.messages = [ ...$scope.currentChat.messages, item ];

                    })
                    let element = $('.converation');
                      // updateScroll(element);
                      element.scrollintoview ({behavior: "instant", block: "end", inline: "nearest"});


                }
                )

          })
          curr = [{user:self.user,presence:'online'}];
          //newusers = [ ...$scope.currentChat.users, curr ]
          roomRef.update({ users: curr})
          self.setPresenceCount();
        }
        $scope.reset = ()=> {
            self.afs.collection('convers').doc($scope.currentId).collection('messages').delete()

        }
        this.setPresenceInit = function(name){
          presRef = self.afs.collection('users').doc(name).set({name,time:getNext()})
        }

        this.start = false;
        this.timeout = false;
        self.savedTime = getNext();
        this.setPresenceCount = function(){
          myref = self.afs.collection('users').doc(self.user);
          console.log("listener pinger per " + self.user)
          $interval( function(){
            myref.update({name:self.user,time:getProgressive()})
            console.log('chiamo')
            time = self.savedTime;
            diff = getNext() - time
            if ( diff > 2500) { self.presence[self.partner] = {};self.presence[self.partner].offline = true;return;}

          },1500)
          ciaoref= self.afs.collection('users').doc(self.partner);
          console.log("listener per " + self.partner)
          ciaoref.onSnapshot(function(doc){
              self.savedTime = getNext();

          })
        }
        this.sonoUser = function(name){
          self.user = name
          if (!self.user | self.user === '' )   {$scope.chat_error = "********* <strong>LORENZO</strong>, Perfavore Inserisci un nome e poi clicca ENTRA. Bello :)";return;}
          $scope.chat_error='';
          self.setPresenceInit(self.user);
          console.log("username :  " + self.username);
          self.partner = "master";
          self.initializeChat();
          this.getAllUsers();
        }
        this.sonoPaperino = function(){
          self.user="paperino";
          self.timeout=false;
          self.partner="master";
          self.initializeChat();
          self.getAllUsers();
        }
        this.sonoMaster = function(){
          self.user="master";
          self.timeout=false;
          self.partner="paperino";
          self.initializeChat();
          self.getAllUsers();
        }


        this.initializeChat = function(){
          self.afs.collection('convers').get()
            .then(function(snapshot){
                snapshot.forEach(function(doc){
                  $scope.currentId = doc.id;
                  $scope.currentChat = doc.data()
                  $scope.currentChat.messages = [];
                  self.registerMessageListener(doc.id) // TODO deve funzionare una sola volta
                })
            })
          }
        this.getAllUsers = function(){
          self.tutti_utenti = []
          self.afs.collection('users').get().
            then(function(snapshot){
                snapshot.forEach(function(item){
                   var newitem = {};
                   newitem[item.id] = item.data();
                   self.tutti_utenti.push(newitem);
                })
            })
          }

        $scope.previous = function(){

        }
      })
    .directive('myMessanger', function() {
        return {
            restrict: 'E',

            templateUrl:'chat/messager.html'
          }
        })

  function getProgressive(){
    cc = cc +1;
    return cc;
  }
