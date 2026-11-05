/* 편한 법전 서비스워커
 * - 앱 화면(index.html·아이콘)을 저장해 두어 인터넷이 없어도 앱이 열린다.
 * - 법령 본문은 앱이 IndexedDB에 따로 저장하므로 여기서 다루지 않는다.
 * - GitHub 등 다른 주소로 가는 요청은 건드리지 않는다.
 * 앱을 고친 뒤 올릴 때는 VERSION을 바꾸면 다음 실행 때 새 화면으로 바뀐다. */
const VERSION = 'lawbook-v9-7';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const isShell = (u) => u.pathname.endsWith('/') || /\/(index\.html|manifest\.webmanifest|icon-[\w-]+\.png)$/.test(u.pathname);

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== self.location.origin) return;           // GitHub·글꼴 등은 그대로
  if (u.pathname.endsWith('/sw.js')) return;

  if (req.mode === 'navigate' || isShell(u)) {
    // 앱 화면: 저장본을 바로 보여 주고, 뒤에서 새 버전을 받아 둔다 (다음 실행 때 반영)
    e.respondWith(caches.open(VERSION).then(async (c) => {
      const key = req.mode === 'navigate' ? 'index.html' : req;
      const hit = await c.match(key);
      const net = fetch(req).then((r) => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => null);
      return hit || (await net) || new Response('오프라인입니다', { status: 503 });
    }));
    return;
  }
  // 같은 폴더의 법령 파일(laws.json, 폴더/법률.md 등): 항상 새로 읽고, 실패하면 저장본
  e.respondWith(
    fetch(req).then((r) => {
      if (r.ok) { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); }
      return r;
    }).catch(() => caches.match(req).then((m) => m || new Response('', { status: 504 })))
  );
});
