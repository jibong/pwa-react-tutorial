console.log("Service worker running!");

self.addEventListener('install', function() {
    console.log('Installed!');
});

self.addEventListener('activate', function() {
    console.log('Activate!');
});

self.addEventListener('fetch', function(event) {
    console.log('Fetch!', event.request);
});

