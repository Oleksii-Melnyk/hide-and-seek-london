/* Hide & Seek — London Zone 1.
   No build step, no framework: data/*.js define globals, this drives the UI. */
(function () {
  'use strict';

  var RADIUS = 400;                       // metres, the hiding circle
  var HAND_LIMIT = 6;
  var K = { crossed: 'hsl.crossed.v1', asked: 'hsl.asked.v1', deck: 'hsl.deck.v1' };

  /* ---------------- storage ---------------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }

  /* ---------------- tiny markdown: **bold**, *em* ---------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function md(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                 .replace(/\*(.+?)\*/g, '<em>$1</em>')
                 .replace(/·/g, '&middot;');
  }
  function el(id) { return document.getElementById(id); }

  /* ---------------- tabs ---------------- */
  var tabs = el('tabs');
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    Array.prototype.forEach.call(tabs.children, function (x) { x.classList.toggle('active', x === b); });
    Array.prototype.forEach.call(document.querySelectorAll('.panel'), function (p) {
      p.classList.toggle('active', p.id === 'panel-' + b.dataset.panel);
    });
    if (b.dataset.panel === 'map' && map) map.invalidateSize();
  });

  /* ================================================================
     MAP
     ================================================================ */
  var crossed = {};                       // name -> true
  load(K.crossed, []).forEach(function (n) { crossed[n] = true; });

  var map = L.map('map', { zoomControl: false, tap: false });
  map.fitBounds(L.latLngBounds(STATIONS.map(function (s) { return [s.lat, s.lon]; })).pad(0.06));

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
                 'contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  var LIVE = { color: '#e11d48', weight: 1.5, opacity: .85, fillColor: '#e11d48', fillOpacity: .10 };
  var DEAD = { color: '#94a3b8', weight: 1, opacity: .7, dashArray: '3 4',
               fillColor: '#94a3b8', fillOpacity: .04 };

  var layer = L.layerGroup().addTo(map);
  var entries = STATIONS.map(function (s) {
    var circle = L.circle([s.lat, s.lon], Object.assign({ radius: RADIUS }, LIVE));
    var marker = L.marker([s.lat, s.lon], {
      icon: L.divIcon({
        className: 'stn-label',
        html: '<i></i><b>' + esc(s.n) + '</b>',
        iconSize: [120, 26],
        iconAnchor: [60, 5]
      }),
      keyboard: false,
      riseOnHover: true
    });
    var entry = { s: s, circle: circle, marker: marker };
    function hit() { toggle(entry); }
    circle.on('click', hit);
    marker.on('click', hit);
    return entry;
  });

  function visible(entry) {
    return !(el('filter-nontube').checked && entry.s.m !== 'tube');
  }

  function paint(entry) {
    var out = !!crossed[entry.s.n];
    entry.circle.setStyle(out ? DEAD : LIVE);
    var node = entry.marker.getElement();
    if (node) node.classList.toggle('crossed', out);
  }

  function toggle(entry) {
    if (crossed[entry.s.n]) delete crossed[entry.s.n]; else crossed[entry.s.n] = true;
    save(K.crossed, Object.keys(crossed));
    paint(entry);
    updateCounter();
    if (!el('search-results').hidden) renderSearch(el('search').value);
  }

  function redrawLayer() {
    layer.clearLayers();
    entries.forEach(function (entry) {
      if (!visible(entry)) return;
      layer.addLayer(entry.circle);
      layer.addLayer(entry.marker);
      paint(entry);
    });
    updateCounter();
  }

  function updateCounter() {
    var shown = entries.filter(visible);
    var left = shown.filter(function (e) { return !crossed[e.s.n]; }).length;
    el('counter').textContent = left + ' of ' + shown.length + ' left';
  }

  el('filter-nontube').addEventListener('change', redrawLayer);
  redrawLayer();

  /* ---- labels: automatic by zoom, overridable ---- */
  var labelOverride = null;
  function applyLabels() {
    var on = labelOverride === null ? map.getZoom() >= 14 : labelOverride;
    map.getContainer().classList.toggle('labels-on', on);
    el('btn-labels').classList.toggle('on', on);
  }
  map.on('zoomend', function () { if (labelOverride === null) applyLabels(); });
  el('btn-labels').addEventListener('click', function () {
    labelOverride = !map.getContainer().classList.contains('labels-on');
    applyLabels();
  });
  applyLabels();

  /* ---- reset ---- */
  el('btn-reset').addEventListener('click', function () {
    if (!Object.keys(crossed).length) return;
    if (!confirm('Restore all ' + entries.length + ' stations?')) return;
    crossed = {};
    save(K.crossed, []);
    entries.forEach(paint);
    updateCounter();
  });

  /* ---- search ---- */
  var search = el('search'), results = el('search-results');
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function renderSearch(q) {
    var needle = norm(q);
    if (!needle) { results.hidden = true; results.innerHTML = ''; return; }
    var hits = entries.filter(function (e) { return norm(e.s.n).indexOf(needle) >= 0; }).slice(0, 12);
    results.innerHTML = hits.length
      ? hits.map(function (e, i) {
          return '<li data-i="' + entries.indexOf(e) + '" class="' + (crossed[e.s.n] ? 'done' : '') + '">' +
                 esc(e.s.n) + '</li>';
        }).join('')
      : '<li class="done">No station by that name</li>';
    results.hidden = false;
  }
  search.addEventListener('input', function () { renderSearch(search.value); });
  search.addEventListener('focus', function () { renderSearch(search.value); });
  results.addEventListener('click', function (e) {
    var li = e.target.closest('li[data-i]'); if (!li) return;
    var entry = entries[+li.dataset.i];
    map.setView([entry.s.lat, entry.s.lon], Math.max(map.getZoom(), 15));
    entry.circle.setStyle({ weight: 4 });
    setTimeout(function () { paint(entry); }, 900);
    results.hidden = true;
    search.blur();
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#search-wrap')) results.hidden = true;
  });

  /* ---- GPS ---- */
  var watchId = null, meDot = null, meRing = null;
  el('btn-locate').addEventListener('click', function () {
    if (watchId !== null) { stopLocate(); return; }
    if (!navigator.geolocation) { alert('This browser has no geolocation.'); return; }
    this.classList.add('on');
    watchId = navigator.geolocation.watchPosition(onFix, onFixFail, {
      enableHighAccuracy: true, maximumAge: 5000, timeout: 20000
    });
  });
  function onFix(pos) {
    var p = [pos.coords.latitude, pos.coords.longitude], acc = pos.coords.accuracy || 0, first = !meDot;
    if (!meDot) {
      meRing = L.circle(p, { radius: acc, color: '#2563eb', weight: 1, fillColor: '#2563eb', fillOpacity: .12 }).addTo(map);
      meDot = L.circleMarker(p, { radius: 6, color: '#fff', weight: 2, fillColor: '#2563eb', fillOpacity: 1 }).addTo(map);
    } else {
      meRing.setLatLng(p).setRadius(acc);
      meDot.setLatLng(p);
    }
    if (first) map.setView(p, Math.max(map.getZoom(), 15));
  }
  function onFixFail(err) {
    stopLocate();
    alert('Could not get a location: ' + err.message +
          (location.protocol === 'file:' ? '\n\n(Geolocation needs https — it will work once deployed.)' : ''));
  }
  function stopLocate() {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    watchId = null;
    el('btn-locate').classList.remove('on');
    if (meDot) { map.removeLayer(meDot); map.removeLayer(meRing); meDot = meRing = null; }
  }

  /* ================================================================
     RULES
     ================================================================ */
  el('rules-body').innerHTML = RULES.map(function (r) {
    return '<div class="rule"><h3>' + esc(r.title) + '</h3>' +
      (r.body || []).map(function (p) { return '<p>' + md(p) + '</p>'; }).join('') +
      (r.list ? '<ul>' + r.list.map(function (li) { return '<li>' + md(li) + '</li>'; }).join('') + '</ul>' : '') +
      '</div>';
  }).join('');

  /* ================================================================
     QUESTIONS
     ================================================================ */
  el('questions-body').innerHTML = QUESTIONS.map(function (q, qi) {
    return '<details class="qcat"' + (qi === 0 ? ' open' : '') + '>' +
      '<summary><span class="dot" style="background:' + q.colour + '"></span>' + esc(q.cat) +
      '<span class="cost">draw ' + q.draw + ' &middot; keep ' + q.keep + '</span></summary>' +
      '<p class="blurb">' + md(q.blurb) + '</p><ul>' +
      q.items.map(function (t, i) {
        return '<li data-q="' + qi + '" data-i="' + i + '">' + md(t) + '</li>';
      }).join('') + '</ul></details>';
  }).join('');

  var asked = load(K.asked, []);
  function renderLog() {
    var log = el('asked-log');
    log.innerHTML = asked.length
      ? asked.map(function (a) {
          return '<li>' + md(a.text) + ' <span class="when">' + esc(a.cat) + ', ' + esc(a.at) + '</span></li>';
        }).join('')
      : '<li class="empty">Nothing asked yet.</li>';
  }
  renderLog();
  el('questions-body').addEventListener('click', function (e) {
    var li = e.target.closest('li[data-q]'); if (!li) return;
    var q = QUESTIONS[+li.dataset.q];
    asked.push({
      cat: q.cat + ' (draw ' + q.draw + ')',
      text: q.items[+li.dataset.i],
      at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    save(K.asked, asked);
    renderLog();
    el('asked-log').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  el('btn-clear-log').addEventListener('click', function () {
    if (asked.length && !confirm('Clear the question log?')) return;
    asked = []; save(K.asked, asked); renderLog();
  });

  /* ================================================================
     DECK
     ================================================================ */
  var FLAT = [];                                   // one entry per physical card
  DECK.forEach(function (c, i) { for (var k = 0; k < c.qty; k++) FLAT.push(i); });

  var deckState = load(K.deck, null);
  if (!deckState || !deckState.pile) deckState = freshDeck();

  function freshDeck() { return { pile: shuffle(FLAT.slice()), hand: [], banked: [] }; }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function persistDeck() { save(K.deck, deckState); }

  function cardHTML(c, extra) {
    var tag = c.type === 'time' ? 'Time bonus'
            : c.type === 'power' ? 'Powerup'
            : 'Curse &middot; discard ' + c.cost;
    return '<div class="card ' + c.type + '"><h4>' + esc(c.title) +
      '<span class="tag">' + tag + '</span></h4><p>' + md(c.text) + '</p>' +
      (c.note ? '<p class="note">' + md(c.note) + '</p>' : '') + (extra || '') + '</div>';
  }

  function renderDeck() {
    el('pile-count').textContent = deckState.pile.length;

    var minutes = deckState.banked.reduce(function (a, i) { return a + (DECK[i].value || 0); }, 0);
    el('banked').innerHTML = deckState.banked.length
      ? 'Banked: <b>+' + minutes + ' min</b> from ' + deckState.banked.length + ' card' +
        (deckState.banked.length === 1 ? '' : 's') + '. <button class="ghost" id="btn-unbank">Reset</button>'
      : 'Nothing banked yet.';
    var unbank = el('btn-unbank');
    if (unbank) unbank.addEventListener('click', function () {
      deckState.banked = []; persistDeck(); renderDeck();
    });

    el('hand-note').textContent = deckState.hand.length + ' / ' + HAND_LIMIT +
      (deckState.hand.length > HAND_LIMIT ? ' — over the limit, discard' : '');
    el('hand').innerHTML = deckState.hand.length
      ? deckState.hand.map(function (i, pos) {
          var c = DECK[i];
          var row = '<div class="row">' +
            (c.type === 'time' ? '<button data-act="bank" data-pos="' + pos + '">Bank +' + c.value + '</button>' : '') +
            (c.type === 'curse' ? '<button data-act="discard" data-pos="' + pos + '">Cast, then discard ' + c.cost + ' more</button>'
                                : '<button class="ghost" data-act="discard" data-pos="' + pos + '">Discard</button>') +
            '</div>';
          return cardHTML(c, row);
        }).join('')
      : '<p class="empty">Answer a question, then draw.</p>';

    var filter = document.querySelector('#deck-filter .chip.active').dataset.type;
    el('reference').innerHTML = DECK
      .filter(function (c) { return filter === 'all' || c.type === filter; })
      .map(function (c) { return cardHTML(c, '<p class="note">&times;' + c.qty + ' in the deck</p>'); })
      .join('');
  }

  function draw(n) {
    for (var i = 0; i < n; i++) {
      if (!deckState.pile.length) {
        var held = deckState.hand.concat(deckState.banked).slice();
        var rest = FLAT.slice();
        held.forEach(function (x) { var k = rest.indexOf(x); if (k >= 0) rest.splice(k, 1); });
        deckState.pile = shuffle(rest);
        if (!deckState.pile.length) break;
      }
      deckState.hand.push(deckState.pile.pop());
    }
    persistDeck();
    renderDeck();
  }

  [1, 2, 3, 4].forEach(function (n) {
    el('btn-draw' + n).addEventListener('click', function () { draw(n); });
  });
  el('btn-shuffle').addEventListener('click', function () {
    if (!confirm('Reshuffle the whole deck? Hand and banked cards are cleared.')) return;
    deckState = freshDeck(); persistDeck(); renderDeck();
  });
  el('hand').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-act]'); if (!b) return;
    var pos = +b.dataset.pos, card = deckState.hand.splice(pos, 1)[0];
    if (b.dataset.act === 'bank') deckState.banked.push(card);
    persistDeck(); renderDeck();
  });
  el('deck-filter').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    Array.prototype.forEach.call(this.children, function (x) { x.classList.toggle('active', x === b); });
    renderDeck();
  });

  renderDeck();
})();
