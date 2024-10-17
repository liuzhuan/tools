const cacheName = 'v1'

self.addEventListener('install', e => {
  e.waitUntil(
    addResourcesToCache([
      './',
      './index.html',
      './manifest.json',
      './icon.png',
      './icon-192x192.png',
      './icon-512x512.png',
    ])
  )
})

async function addResourcesToCache(resources) {
  const cache = await caches.open(cacheName)
  await cache.addAll(resources)
}

self.addEventListener('fetch', e => {
  e.respondWith(cacheFirst(e.request))
})

async function cacheFirst(request) {
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  const responseFromNetwork = await fetch(request)
  putInCache(request, responseFromNetwork.clone())
  return responseFromNetwork
}

async function putInCache(request, response) {
  const cache = await caches.open(cacheName)
  await cache.put(request, response)
}
