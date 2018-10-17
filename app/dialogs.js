function confirmCallback(){
    console.log("I AM WORKING");
}

function dialogConfirm(){
    
    navigator
        .notification
        .confirm(
            "so bad day ciaociao",
            confirmCallback,
            "EDDIE says",
            ["ok", "no"]


        );
}