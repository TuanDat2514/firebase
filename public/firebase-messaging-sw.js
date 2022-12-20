//public/firebase-messaging-sw.js
import firebase from "firebase";

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search);
    // eslint-disable-next-line no-restricted-globals
    self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};
firebase.initializeApp(self.firebaseConfig || defaultConfig);
if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
    const channel = new BroadcastChannel('notifications');
    messaging.onBackgroundMessage(function (payload) {
        //can not console.log here
        channel.postMessage(payload);
    });
}

