var messagingFcm;
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./firebase-messaging-sw.js?' + webapp_version);
        const firebaseConfig = {
            apiKey: "",
            authDomain: "bookmyrajshreehybrid.firebaseapp.com",
            projectId: "bookmyrajshreehybrid",
            storageBucket: "bookmyrajshreehybrid.appspot.com",
            messagingSenderId: "635626394914",
            appId: "1:635626394914:web:f09b62ef4810785a59c17b",
            measurementId: "G-Y81HPJ6310"
        };
        const app = firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();
        messagingFcm = messaging;
        getTokenFunction(messaging);
        messaging.onMessage((payload) => {
            // if app is open focus then notification data will receive here
            console.log("Message received", payload);
            navigator.serviceWorker.getRegistration().then(function (reg) {
                var notificationTitle = payload.data.title;
                var notificationOptions = {
                    body: payload.data.message,
                    icon: "https://stage.bookmyrajshree.com/app.static/img/rajicon.png",
                    image: payload.data["imgUrl"],
                    data: {
                        url: "https://stage.bookmyrajshree.com/",
                        lotcode: payload.data["imgDeepLink"],
                        drawdate: payload.data["drawDate"]
                    },
                    actions: [{
                            action: 'GO',
                            title: 'BUY'
                        }]
                };
                return reg.showNotification(notificationTitle, notificationOptions);
            });
        });
    });
} else {
    setTokenSentToServer(false);
    console.log("Your browser not supported notification 01");
}

function getTokenFunction(messaging) {
    var param = {};
    loadData('NOTIFICATION', 'REQ001', 'NOTIFICATIONKEY', param, 'COMMON').then(responseArr => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            var vapid_key = responseArr['vapid_key'];
            var server_key = responseArr['server_key'];
            messaging.getToken({
                vapidkey: vapid_key
            }).then((currentToken) => {
                if (currentToken) {
                    console.log(currentToken);
                    sendTokenToServer(currentToken);
                    return fetch('https://iid.googleapis.com/iid/v1/' + currentToken + '/rel/topics/global_stage_web', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'key=' + server_key // Replace with your FCM server key
                        }
                    });
                } else {
                    Notification.requestPermission().then((permission) => {
                        if (permission == "granted") {
                            getTokenFunction(messaging);
                        } else {
                            console.log("Invalid Notification Permission Found:" + permission);
                        }
                    });
                }
            }).then((response) => {
                console.log(response);
                console.log('Subscribed to topic "global_stage_web" in mobile');
            }).catch((err) => {
                console.log(err);
                Notification.requestPermission().then((permission) => {
                    if (permission == "granted")
                        getTokenFunction(messaging);
                    else {
                        console.log("Invalid Notification Permission Found:" + permission);
                    }
                });
            });
        }
    });
}

function sendTokenToServer(currentToken) {
    var tokenData = "";
    if (user) {
        var mobileno = user.mobileno;
        tokenData = {
            "token": currentToken,
            "mobileno": mobileno
        };
    } else {
        tokenData = {
            "token": currentToken
        };
    }
    loadData('HOME', 'REQ001', 'NOTIFICATION_TOKEN', tokenData, 'COMMON').then(responseArr => {
        var response = responseArr;
        if (response.status.toUpperCase() == "SUCCESS") {
            console.log(response);
            setTokenSentToServer(true);
            console.log(response.message);
        } else {
            setTokenSentToServer(false);
            var getToken = isTokenSentToServer();
            console.log(response.message);
        }
    });
}

function isTokenSentToServer() {
    var tokenValue = getCookie('token');
    return tokenValue === '1';
}

function setTokenSentToServer(sent) {
    setCookie('token', sent ? '1' : '0');
}
