app.controller("kikass", ["$scope", "clSettings", function ($scope, constants ) {

  // INIT VALUES
  this.input = {};
  this.input.separator = '.';
  $scope.squadre_serie_a = constants.squadre_serie_a.toString().split(",");

  // * END
  let teamData = {
    "teams":[{
      "name":"Udinese",
      "formazione":"(4-4-1-1)",
      "players": "Bizzarri; Larsen; Danilo; Nuytinck, Samir; Barak, Fofana, Hallfredsson, Jankto; De Paul; Lasagna. Allenatore: Tudo    Indisponibili: Angella    Squalificati: Behrami"
    }]
  }
  $scope.teams = logd(teamData);

  function mastica(selezionata, team){
    let select = selezionata;
    for ( let ii = 0; ii<team.length; ii++){
      if (team[ii].name.toLowerCase() === select){
        let inp = team[ii].players;
        let players = inp.split(";");
        self.results = {};
        for (let jj = 0; jj < players.length; jj++){
          if (players[jj].replace(/^\s+|\s+$/g, "") === match)
            self.results = "trovato ex: " + match;
        }

      }
    }
    $scope.results = self.results;

  }
  self.match = "Danilo";
  mastica('udinese', teamData.teams)

  this.done = (valori) => {
    $scope.out2 = {};
    valori.formazione = valori.formazione.replace(/[,;.]+/g,"");
    $scope.out2.gioca = valori.formazione.split(" ");
    $scope.out2.team = valori.selected_team;

  }

}])








function logd(json){
  let out = JSON.stringify(json,null,"    ");
  console.log( out );
  return out;
}
