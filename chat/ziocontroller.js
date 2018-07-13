(function () { });
afs = firebase.firestore();
/  room
    / ngMessages
    / users;
var MEssagesListener = (function () {
    function MEssagesListener() {
    }
    return MEssagesListener;
}());
(function () {
    afs.collection('messages').doc;
});
var UserListener = (function () {
    function UserListener() {
    }
    return UserListener;
}());
(function (user) {
    var userRef = afs.collection('users').doc(user);
    userRef;
});
var StrenghConnecter = (function () {
    function StrenghConnecter() {
    }
    return StrenghConnecter;
}());
('free');
{
    var roomSnaps = afs.collection('rooms').where("free", "==", "true");
    roomSnaps.get()
        .then(function (rows) {
        var picked = false;
        rows.forEach(function (roomDoc) {
            if (!picked)
                self.roomId = roomDoc.id;
            self.room = roomDoc.data();
            picked = true;
        });
    });
}
