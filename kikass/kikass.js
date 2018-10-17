app.controller("kikass", ["$scope", "clSettings", function ($scope, constants ) {
  let self = (this);
  // INIT VALUES
  this.input = {};
  this.input.separator = ',';
  this.input.selected_team_1 = "SELEZIONA...";
  this.input.selected_team_2 = "SELEZIONA...";
  $('.popovers-1').popover({show:true,html:true});
  $scope.squadre_serie_a = constants.squadre_serie_a;

  // * END

  $scope.teams = logd(teamData);

  function mastica(selezionata, team) {
    let select = selezionata,squadra_trovata=false;
    let results = "";
    for ( let ii = 0; ii<team.length; ii++) {
      if (team[ii].name.toLowerCase() === select) {
        let inp = team[ii].players;
        let players = inp.split(";");
        self.results = {};
        for (let jj = 0; jj < players.length; jj++) {
          if (players[jj].trim() === self.match.trim())
            results = self.match;
        }
        squadra_trovata = true;
      }
    }
    return results;
  }

  this.done = (valori) => {
    $scope.out2 = {};
    // valori.formazione = valori.formazione.replace(/[,;.]+/g,"");
    $scope.out2.gioca = valori.formazione_1.split(self.input.separator);
    if ($scope.out2.gioca.length == 1) $scope.error = `attenzione possibile errore -> " ${self.input.separator} "`;
    $scope.out2.team = self.input.selected_team_2;
    self.results_1 = "";
    for (let ii = 0 ; ii < $scope.out2.gioca.length ; ii++) {
      self.match = "" || $scope.out2.gioca[ii];
      let match = mastica($scope.out2.team.toLowerCase(), teamData.teams);
      if (match !== "")
        self.results_1 += ", anche " + match; // '<a class="btn btn-info" ng-click="main.figurina({{match}})">{{match}}</a>';
    }
    $scope.out2.gioca = valori.formazione_2.split(self.input.separator);
    if ($scope.out2.gioca.length == 1) $scope.error = `attenzione possibile errore -> " ${self.input.separator} "`;
    $scope.out2.team = self.input.selected_team_1;
    self.results_2 = "";
    for (let ii = 0 ; ii < $scope.out2.gioca.length ; ii++) {
      self.match = "" || $scope.out2.gioca[ii];
      let match = mastica($scope.out2.team.toLowerCase(), teamData.teams);
      if (match !== "")
        self.results_2 += ", anche " + match;
    }

    stampaRisultati();
    logd($scope.out2);
  }



  function helper_trova_casi_strani() {
    $scope.occorrenze = [];
    for (let ii = 0; ii < teamData.teams.length; ii++) {
      let team = teamData.teams[ii];
      let players = team.players;
      // casi
      if (players) ;

    }
  }
  function stampaRisultati(ticker) {
    if (self.results_1 !== "") $scope.results = "squadra 1: " + self.results_1;
        else $scope.results = "cazze nere in team 1";
    if (self.results_2 !== "") $scope.results += "squadra 2: " + self.results_2;
        else $scope.results += "cazze nere in team 2";

  }

  function logd(json) {
    let out = JSON.stringify(json, null, "    ");
    console.log( out );
    return out;
  }
  self.activate = () => {
    
  }
}])
