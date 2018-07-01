function blavla(postData){
  fetch( "http://aaa.com" , {
    method: "post",
    body: JSON.stringify(postData)
  })
}
function fuckerup(json){
  let bru = []
  for ( i = 0; i < json.length; i++)
  {
    let item2 = {}
    for (p in json[i]){
      obj = json[i];
      item2[p] = encodeURIComponent(obj[p]);

    }
    if ( i==10) console.log(item2)
    bru.push(item2)
  }
  return bru;
}

app.controller("batch" , function($scope, $http){
  $scope.bla = () =>{

  }

  let folder = "test03";
  var url = 'https://api.mlab.com/api/1/databases/cbmanager/collections/';
  let apikey = '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf';

  $scope.docu = url + folder + apikey;
  var uploadTotal
  var cc = 0; // progress
  function initLoadCSV(){
    $http.get("http://LOCALHOST" + "/" + "data.json",
    {"headers":{
      "content-type": "json;charset=ISO-8859-1",
      "accept" : "json;charset:undefined"}}
    ).then(response => { $scope.data = response.data;$scope.uploadTotal=$scope.data.length;console.log($scope.data[2]);$scope.sample = $scope.data[2];})


  }


  complete = () => {
    console.log("complete.")

  }
  $scope.upload = () => {
    // $http.post( $scope.docu , $scope.data  ,{"headers":{"Content-Type" : "application/json; charset=utf-8"}})
    //   .then( () => $scope.outputText = `upload complete.`)
    //   .catch(error => console.log(error) );
  };

  $scope.aaaaa  = () => {
    jQuery.ajax({
      url : "http://localhost:3000/data.json",
      method: "get",
      headers : {"content-type": "application/json;charset=UTF-8;",
      "accept-charset" : "uft-8"
    },
    dataType : "json",
    success : function (data){
      alert(JSON.stringify(data));
      $scope.sample = data[2]
    },
    error: function (error) {
      console.log(error)
    }
  }
)
}

function mockProgress(){
  for (cc= 0 ; cc < 18; cc ++){

  }
}
mockProgress()
let uploadStart  = 0;
let inc = 16;
const iamgood = (delay, value) => {
  return new Promise( response => setTimeout( response, delay, value))
}
async function another () {
  await iamgood(500, 12)
  .then(() => {return "done"})
}
$scope.dammilafiga = async () => {
  var result = await another();
  console.log(result);
}

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

  const printAll = async () =>{
    $scope.uploadProgress = uploadStart;
    await printString("1111111", 600);
    $scope.uploadProgress += inc;
    await printString("2222222", 600);
    $scope.uploadProgress += inc;
    await printString("33333333",600);
    $scope.uploadProgress += inc;
    $scope.outputText = "done."
  }

  printAll();
})
