// Service Worker for Todo List App

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('todo-cache-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
                'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
                'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: 'https://icons8.com/icon/12780/todo-list',
        badge: 'https://icons8.com/icon/12780/todo-list',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        actions: [
            { action: 'complete', title: 'Mark Complete' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Todo List', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'complete') {
        // Handle completing the task
        clients.openWindow('/');
    }
});
