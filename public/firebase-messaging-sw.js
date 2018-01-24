importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

console.log("Service worker running!");

// self.addEventListener('install', function() {
//     console.log('Installed!');
// });

// self.addEventListener('activate', function() {
//     console.log('Activate!');
// });

// self.addEventListener('fetch', function(event) {
//     console.log('Fetch!', event.request);
// });

firebase.initializeApp({
    'messagingSenderId' : '147513495216'
});

console.log(firebase.messaging());
