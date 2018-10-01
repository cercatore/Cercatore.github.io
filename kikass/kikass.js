app.controller("kikass", ["$scope", "clSettings", function ($scope, constants ) {
  let self = (this);
  // INIT VALUES
  this.input = {};
  this.input.separator = ',';
  this.input.selected_team = "ROMA";
  $scope.squadre_serie_a = constants.squadre_serie_a;

  // * END
  let teamData = {
    "teams":[{
      "name":"Udinese",
      "formazione":"(4-4-1-1)",
      "players": "Bizzarri; Larsen; Danilo; Nuytinck; Samir; Barak; Fofana; Hallfredsson; Jankto; De Paul; Lasagna; Allenatore: Tudo    Indisponibili: Angella    Squalificati: Behrami"
    },
{
  "name":"atalanta",
  "players":"Berisha; Palomino; Caldara; Mancini; Castagne; De Roon; Freuler; Gosens; Cristante; Gomez; Barrow; Allenatore; Gasperini; Indisponibili; Spinazzola; Rizzo; Cornelius; Petagna;Squalificati; Toloi; Masiello"
},
{
  "name":"BOLOGNA",
  "players": "Mirante; Torosidis; Romagnoli; De Maio; Mbaye; Crisetig; Poli; Dzemaili; Masina; Verdi; Avenatti; A disposizione; Santurro; Ravaglia; Keita; Krafth; Donsah; Valencia; Di Francesco; Krejci; Orsolini; Mutton; Allenatore; A Donadoni"
},

{
  "name":"Cagliari",
  "players":"Cragno; Faragò; Pisacane; Ceppitelli; Lykogiannis; Barella; Cigarini; Padoin; Ionita; Farias; Pavoletti; Allenatore; Lopez;Indisponibili; Castan; Ceter;Squalificati; Joao Pedro"
},
{
  "name":"Chievo", // INCOMPLETO
  "players":"Sorrentino; Cacciatore; Tomovic; Dainelli; Gobbi; Castro; Radovanovic; Hetemaj; Giaccherini; Birsa; Inglese; Allenatore; D’Anna "
},
{
  "name":"Empoli",
  "players":""
},
{
  "name":"fiorentina",
  "players":"Sportiello; Laurini; Milenkovic; Pezzella; Biraghi; Benassi; Badelj; Dabo; Chiesa; Saponara; Simeone; Allenatore; Pioli;  CEROFOLINI;  DRAGOWSKI;OLIVERA M;  HRISTOV;  GASPAR;VITOR HUGO;GIL DIAS;EYSSERIC;FALCINELLI;THEREAU"

},
{
  "name":"frosinone",
  "players":""
},
{ "name": "Genoa",
  "players" : "Perin; Biraschi; El Yamiq; Izzo; Pereira; Cofie; Veloso; Bertolacci; Omeonga; Medeiros; Lapadula; A disposizione; Lamanna; Zima; Rossettini; Oprut; Laxalt; Salcedo; Pandev; Rossi; Zanimacchia; Allenatore; Davide Ballardini;"},
{
  "name":"INTER",
  "players":"Handanovic; Cancelo; Skriniar; Miranda; D'Ambrosio; Vecino; Brozovic; Candreva; Rafinha; Perisic; Icardi; All;; Spalletti;a disposizione;  borja valero;  ranocchia;  santon;  gagliardini;"
},
{
  "name":"Juventus",
  "players":"Szczesny; De Sciglio; Benatia; Chiellini; Asamoah; Khedira; Dybala; Pjanic ;Betancour; Matuidi; Cuadrado; Higuain; Mandzukic; A disposizione; Pinsoglio; Loria; Marchisio; Douglas Costa; Alex Sandro; Barzagli; Rugani; Sturaro; Bernardeschi; Allenatore; Allegri"
},
{
  "name":"Lazio",
  "players":"Strakosha; Luiz Felipe; De Vrij; Radu; Marusic; Murgia; Leiva; Milinkovic; Lulic; Felipe Anderson; Immobile; All;; Inzaghi;"
},
{
  "name":"Milan",
  "players":"Donnarumma; Calabria;    Bonucci; Romagnoli; Rodriguez; Kessiè; Locatelli; Bonaventura; Cutrone; Kalinic; Calhanoglu; Allenatore; Gennaro Gattuso"
},
{
  "name":"Napoli",
  "players":"Reina; Hysaj; Albiol; Koulibaly; Mario Rui; Allan; Jorginho; Hamsik; Callejon; Milik; Insigne; A disposizione; Rafael; Sepe; Maggio; Tonelli; Ghoulam; Chiriches; Milic; Zielinski; Diawara; Rog; Ounas; Mertens Allenatore; Sarri"
},
{
  "name":"Parma", // MANCA
  "players":""
},
{
  "name":"Sampdoria",
  "players":"Belec; Bereszynski; Silvestre; Andersen; Strinic; Linetty; Torreira; Praet; Ramirez; Kownacki; Quagliarella; A disposizione; Tozzo; Krapikas; Regini; Ferrari; Murru; Capezzi; Verre; Alvarez; Caprari; Allenatore; Marco Giampaolo;"
},
{
  "name":"Roma",
  "players":"Skorupski; Florenzi; Manolas; Fazio; Kolarov; Pellegrini; Gonalons; Strootman; Schick; Dzeko; Perotti; All; Di Francesco; a disposizione;  alisson;  nainggolan;  de rossi;  El Shaarawy"
},
{
  "name":"Sassuolo",
  "players":"Pegolo; Lemos; Acerbi; Peluso; Adjapong; Missiroli; Magnanelli; Duncan; Rogerio; Berardi; Politano; All;; Iachini; a disposizione;  ;goldaniga;FALCINELLI;biondini"
},
{
  "name":"SPAL",
  "players": "Gomis A; Marchegiani; Poluzzi; Simic L; Konate; Vaisanen; Vicari; Felipe; Mattiello; Costa F; Drame'; Kurtic; Grassi; Viviani; Lazzari M; Schiattarella; Schiavon; Vitale; Bonazzoli; Floccari; Paloschi; Antenucci; Borriello; Meret; Cionek; Everton Luiz; Salamon"
},
{
  "name":"Torino",
  "players":"Sirigu; Bonifazi; N'Koulou; Moretti; De Silvestri; Rincon; Baselli; Ansaldi; Edera; Iago Falque; Belotti; A disposizione; Milinkovic; Ichazo; Molinaro; Barreca; Ferigra; Burdisso; Valdifiori; Acquah; Obi; Niang; Berenguer; Allenatore; Walter Mazzarri;"
}


    ]
  };

  $scope.teams = logd(teamData);

  function mastica(selezionata, team){
    let select = selezionata,squadra_trovata=false;
    let results = "";
    for ( let ii = 0; ii<team.length; ii++){
      if (team[ii].name.toLowerCase() === select){
        let inp = team[ii].players;
        let players = inp.split(";");
        self.results = {};
        for (let jj = 0; jj < players.length; jj++){
          if (players[jj].replace(/^\s+|\s+$/g, "") === self.match)
            results += " " + self.match;
        }
        squadra_trovata = true;
      }
    }
    return results;
  }

  this.done = (valori) => {
    $scope.out2 = {};
    //valori.formazione = valori.formazione.replace(/[,;.]+/g,"");
    $scope.out2.gioca = valori.formazione.split(self.input.separator);
    if ($scope.out2.gioca.length == 1) $scope.error = `attenzione possibile errore -> " ${self.input.separator} "`;
    $scope.out2.team = self.input.selected_team;
    self.match = $scope.out2.gioca[0];
    self.results = mastica($scope.out2.team.toLowerCase(), teamData.teams);
    stampaRisultati ();
    logd($scope.out2)
  }



  function helper_trova_casi_strani(){
    $scope.occorrenze = [];
    for (let ii = 0; ii < teamData.teams.length; ii++){
      let team = teamData.teams[ii];
      let players = team.players;
      // casi
      if (players) ;

    }
  }
  function stampaRisultati(ticker){
    if (self.results !== "") $scope.results = "trovato " + self.results;
        else $scope.results = "cazze nere";

  }

  function logd(json){
    let out = JSON.stringify(json,null,"    ");
    console.log( out );
    return out;
  }

}])
