angular.module('myApp.playground', [])
    .controller('playCtrl', function ($scope, $timeout){
        console.log("Controller loaded. bitch ready");
        let self = (this);
        self.name = "cbagna@bagna.it";
        self.pass = "blabla";
        let auth = firebase.auth();
        self.submit = () => {
            console.log(self.name);
            
            console.log(self.pass +  " confirma:" + self.pass_confirm);
            
        };


    })

