const cacheval = 'v2' // Identifier for this app (this needs to be consistent across every cache update)
const fileToCache = [
    './',
    'index.html',
    'style/style.css',
    'js/index.js',  
    'https://free.currencyconverterapi.com/api/v5/currencies'
];
self.addEventListener('install', event => {
    console.log("service worker installed");
    event.waitUntil(
        caches.open(cacheval).then(cache => {
            return cache.addAll(fileToCache);
        }).catch(err => {
            ;
            console.log("error installing cache", err)
        })
    );
});
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== cacheval)
                        return caches.delete(cacheName);
                })
            );
        }).catch(err => {
            console.log("activation failed", err)
        })
    );
});
self.addEventListener('fetch', event => {
    console.log("fetching", event.request.url);
    const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
    if (event.request.url === url) {
        event.respondWith(
            caches.open('cacheval').then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(response => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            }).catch(err => {
                console.log("fetching failed", err);
            })
        );
    }
});
