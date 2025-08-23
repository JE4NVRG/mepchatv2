// Service Worker para MepChat PWA
// Versão do cache para controle de atualizações
const CACHE_NAME = 'mepchat-v1.0.0';
const STATIC_CACHE = 'mepchat-static-v1.0.0';
const DYNAMIC_CACHE = 'mepchat-dynamic-v1.0.0';

// Assets estáticos para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // Imagens críticas
  '/hero-dashboard.webp',
  '/hero-dashboard.svg',
  // Assets principais
  '/src/main.tsx',
  '/src/App.tsx'
];

// Recursos dinâmicos para cache
const DYNAMIC_ASSETS = [
  // Imagens de benefícios
  '/beneficio-multi.webp',
  '/recurso-respostas.webp',
  '/case-loja.webp',
  // Avatares de depoimentos
  '/testimonials/ana.jpg',
  '/testimonials/carlos.jpg',
  '/testimonials/mariana.jpg',
  '/testimonials/pedro.jpg',
  '/testimonials/lucia.jpg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache de assets estáticos
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache de assets dinâmicos
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log('[SW] Caching dynamic assets...');
        return cache.addAll(DYNAMIC_ASSETS);
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      // Força a ativação imediata
      return self.skipWaiting();
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      // Assume controle de todas as páginas
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Estratégia Cache First para assets estáticos
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estratégia Network First para HTML
  if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Estratégia Cache First para imagens
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estratégia Network First para outros recursos
  event.respondWith(networkFirst(request));
});

// Verifica se é um asset estático
function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         url.includes('.js') ||
         url.includes('.css') ||
         url.includes('.woff') ||
         url.includes('.woff2');
}

// Estratégia Cache First
async function cacheFirst(request) {
  try {
    // Tenta buscar no cache primeiro
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Se não estiver no cache, busca na rede
    const networkResponse = await fetch(request);
    
    // Cacheia a resposta se for bem-sucedida
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache First failed:', error);
    
    // Fallback para página offline se disponível
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Estratégia Network First
async function networkFirst(request) {
  try {
    // Tenta buscar na rede primeiro
    const networkResponse = await fetch(request);
    
    // Cacheia a resposta se for bem-sucedida
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network First failed, trying cache:', error);
    
    // Se a rede falhar, tenta buscar no cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para página offline
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Limpeza periódica do cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCache();
  }
});

// Função para limpar cache antigo
async function cleanOldCache() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    !name.includes('v1.0.0') && name.startsWith('mepchat')
  );
  
  await Promise.all(
    oldCaches.map(cacheName => caches.delete(cacheName))
  );
  
  console.log('[SW] Old caches cleaned:', oldCaches);
}