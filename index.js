function onLoad(){
    document.addEventListener("deviceready", onDeviceReady, false);
    
    $(".confirmDialog").addEventListener('click', dialogConfirm)
}