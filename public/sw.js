/* 自动生成，勿手改 */
const VERSION = "fc-8ffc53f5d4";
const SHELL = ["/","./assets/app.d97cb0bf34.js","./assets/style.e5374820b7.css","./manifest.webmanifest","./icon-192.png"];
const RUNTIME = "fc-rt-8ffc53f5d4";
/* 财务计算器 service worker 主体（VERSION / SHELL 由 scripts/build.mjs 注入） */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
      .catch(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== VERSION; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // 页面导航：网络优先，断网回落缓存
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (r) {
        var cp = r.clone();
        caches.open(VERSION).then(function (c) { c.put("./", cp); });
        return r;
      }).catch(function () { return caches.match("./"); })
    );
    return;
  }

  // 静态资源：缓存优先（文件名带内容哈希，更新即换名）
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (r) {
        if (r && r.ok && r.type === "basic") {
          var cp = r.clone();
          caches.open(VERSION).then(function (c) { c.put(req, cp); });
        }
        return r;
      });
    })
  );
});
