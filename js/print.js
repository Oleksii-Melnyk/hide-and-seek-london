/* Builds the printable sheet as one SVG, in millimetres, from the same
 * station data the app uses. No tiles: this is meant to be printed and
 * written on, so it is line work on white. */
(function () {
  'use strict';

  var RADIUS = 400;                      // metres
  var RIVER_WIDTH = 220;                 // metres, for the schematic river
  var LAT0 = 51.5;

  var SIZES = {
    a4: { w: 297, h: 210, font: 1.9, label: 'A4' },
    a3: { w: 420, h: 297, font: 2.5, label: 'A3' }
  };
  var MARGIN = 8, HEADER = 13;

  function project(lat, lon) {
    return { x: lon * Math.cos(LAT0 * Math.PI / 180) * 111320, y: -lat * 110574 };
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function box(size) {
    var S = SIZES[size];
    return { S: S, x: MARGIN, y: MARGIN + HEADER,
             w: S.w - 2 * MARGIN, h: S.h - 2 * MARGIN - HEADER };
  }

  function build(size) {
    var S = SIZES[size];
    var boxW = S.w - 2 * MARGIN, boxH = S.h - 2 * MARGIN - HEADER;

    var pts = STATIONS.map(function (s) {
      var p = project(s.lat, s.lon); p.n = s.n; p.m = s.m; return p;
    });
    var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
    var minX = Math.min.apply(null, xs) - RADIUS, maxX = Math.max.apply(null, xs) + RADIUS;
    var minY = Math.min.apply(null, ys) - RADIUS, maxY = Math.max.apply(null, ys) + RADIUS;

    var k = Math.min(boxW / (maxX - minX), boxH / (maxY - minY));   // mm per metre
    var offX = MARGIN + (boxW - (maxX - minX) * k) / 2 - minX * k;
    var offY = MARGIN + HEADER + (boxH - (maxY - minY) * k) / 2 - minY * k;
    var mm = function (p) { return { x: p.x * k + offX, y: p.y * k + offY }; };

    /* ---- river, clipped to the map box ---- */
    var clip = '<clipPath id="box"><rect x="' + MARGIN + '" y="' + (MARGIN + HEADER) +
               '" width="' + boxW + '" height="' + boxH + '"/></clipPath>';
    var river = THAMES.map(function (c) { return mm(project(c[0], c[1])); })
      .map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(2) + ' ' + p.y.toFixed(2); })
      .join(' ');

    /* ---- circles and dots ---- */
    var r = RADIUS * k;
    var body = pts.map(function (p) {
      var c = mm(p);
      return '<circle cx="' + c.x.toFixed(2) + '" cy="' + c.y.toFixed(2) + '" r="' + r.toFixed(2) +
             '" class="ring ' + p.m + '"/>';
    }).join('') +
    pts.map(function (p) {
      var c = mm(p);
      return '<circle cx="' + c.x.toFixed(2) + '" cy="' + c.y.toFixed(2) + '" r="0.55" class="dot"/>';
    }).join('');

    /* ---- labels: three rings of candidate positions, leader line when the
           label has to sit away from its dot, dots treated as obstacles ---- */
    var fs = S.font, placed = [], leaders = [];
    pts.forEach(function (p) {
      var c = mm(p);
      placed.push({ x1: c.x - 0.9, x2: c.x + 0.9, y1: c.y - 0.9, y2: c.y + 0.9 });
    });

    var cands = [];
    [[1.1, 0], [3.4, 1], [6.0, 2]].forEach(function (ring) {
      var d = ring[0], lead = ring[1];
      cands.push([ d,  fs * 0.35, 'start', lead], [-d,  fs * 0.35, 'end', lead],
                 [ 0, -d,         'middle', lead], [0,   d + fs,   'middle', lead],
                 [ d, -d * 0.7,   'start', lead], [-d, -d * 0.7,   'end', lead],
                 [ d,  d * 0.7 + fs * 0.35, 'start', lead], [-d, d * 0.7 + fs * 0.35, 'end', lead]);
    });

    function overlap(a, b) {
      return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
    }

    /* densest first: a station with many neighbours needs the pick of the spots */
    var order = pts.map(function (p, i) {
      var near = 0;
      pts.forEach(function (q) {
        if (q !== p && Math.abs(q.x - p.x) < 900 && Math.abs(q.y - p.y) < 900) near++;
      });
      return { i: i, near: near };
    }).sort(function (a, b) { return b.near - a.near; });

    var out = [];
    order.forEach(function (o) {
      var p = pts[o.i], c = mm(p), w = p.n.length * fs * 0.48;
      var best = null, bestHits = 1e9;
      for (var i = 0; i < cands.length; i++) {
        var x = c.x + cands[i][0], y = c.y + cands[i][1], anchor = cands[i][2];
        var x1 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
        var box = { x1: x1 - 0.3, x2: x1 + w + 0.3, y1: y - fs, y2: y + 0.4 };
        if (box.x1 < MARGIN || box.x2 > S.w - MARGIN) continue;
        var hits = 0;
        for (var j = 0; j < placed.length; j++) if (overlap(box, placed[j])) hits++;
        if (hits < bestHits) {
          bestHits = hits;
          best = { x: x, y: y, anchor: anchor, box: box, lead: cands[i][3], cx: c.x, cy: c.y };
        }
        if (hits === 0) break;
      }
      placed.push(best.box);
      if (best.lead) {
        var tx = best.anchor === 'start' ? best.x - 0.5 : best.anchor === 'end' ? best.x + 0.5 : best.x;
        leaders.push('<line x1="' + best.cx.toFixed(2) + '" y1="' + best.cy.toFixed(2) +
                     '" x2="' + tx.toFixed(2) + '" y2="' + (best.y - fs * 0.3).toFixed(2) + '" class="leader"/>');
      }
      out[o.i] = '<text x="' + best.x.toFixed(2) + '" y="' + best.y.toFixed(2) +
                 '" text-anchor="' + best.anchor + '">' + esc(p.n) + '</text>';
    });
    var labels = leaders.join('') + out.join('');

    /* ---- scale bar, 1 km ---- */
    var barLen = 1000 * k, barX = MARGIN + 2, barY = S.h - MARGIN - 3;

    /* ---- header ---- */
    var head =
      '<text x="' + MARGIN + '" y="' + (MARGIN + 5.5) + '" class="title">Hide &amp; Seek &middot; London Zone 1</text>' +
      '<text x="' + MARGIN + '" y="' + (MARGIN + 10) + '" class="sub">' +
        STATIONS.length + ' stations &middot; 400 m hiding circles &middot; cross one out when it is ruled out' +
      '</text>' +
      '<text x="' + (S.w - MARGIN) + '" y="' + (MARGIN + 5.5) + '" text-anchor="end" class="sub">' +
        'Hider ______________   Start ______ : ______</text>' +
      '<text x="' + (S.w - MARGIN) + '" y="' + (MARGIN + 10) + '" text-anchor="end" class="sub">' +
        'Found ______ : ______   Bonuses + ______ min</text>' +
      '<line x1="' + MARGIN + '" y1="' + (MARGIN + HEADER - 1.5) + '" x2="' + (S.w - MARGIN) +
        '" y2="' + (MARGIN + HEADER - 1.5) + '" class="rule"/>';

    var foot =
      '<line x1="' + barX + '" y1="' + barY + '" x2="' + (barX + barLen) + '" y2="' + barY + '" class="bar"/>' +
      '<line x1="' + barX + '" y1="' + (barY - 1) + '" x2="' + barX + '" y2="' + (barY + 1) + '" class="bar"/>' +
      '<line x1="' + (barX + barLen) + '" y1="' + (barY - 1) + '" x2="' + (barX + barLen) + '" y2="' + (barY + 1) + '" class="bar"/>' +
      '<text x="' + (barX + barLen + 1.5) + '" y="' + (barY + 0.8) + '" class="sub">1 km</text>' +
      '<text x="' + (S.w - MARGIN) + '" y="' + barY + '" text-anchor="end" class="sub">' +
        'River schematic &middot; dashed circles are not Underground stations</text>' +
      '<g transform="translate(' + (S.w - MARGIN - 4) + ',' + (barY - 9) + ')">' +
        '<path d="M0 0 L0 -6 M0 -6 L-1.5 -3.5 M0 -6 L1.5 -3.5" class="bar"/>' +
        '<text x="0" y="2.6" text-anchor="middle" class="sub">N</text></g>';

    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + S.w + 'mm" height="' + S.h + 'mm" ' +
      'viewBox="0 0 ' + S.w + ' ' + S.h + '" class="sheet ' + size + '">' +
      '<rect width="' + S.w + '" height="' + S.h + '" fill="#fff"/>' +
      clip +
      '<g clip-path="url(#box)"><path d="' + river + '" class="river" stroke-width="' +
        (RIVER_WIDTH * k).toFixed(2) + '"/></g>' +
      head + body + '<g class="labels" font-size="' + fs + '">' + labels + '</g>' + foot +
      '</svg>';
  }

  var tileMap = null;

  function buildStreets(size) {
    var b = box(size), S = b.S;
    var host = document.getElementById('sheet');
    host.innerHTML =
      '<div class="sheet streets" style="width:' + S.w + 'mm;height:' + S.h + 'mm">' +
        '<div class="hd" style="left:' + MARGIN + 'mm;top:' + MARGIN + 'mm;' +
          'width:' + (S.w - 2 * MARGIN) + 'mm">' +
          '<span class="t">Hide &amp; Seek &middot; London Zone 1</span>' +
          '<span class="f">Hider ______________ &nbsp; Start ______ : ______ &nbsp; ' +
          'Found ______ : ______ &nbsp; Bonuses + ______ min</span>' +
          '<span class="s">' + STATIONS.length + ' stations &middot; 400 m hiding circles &middot; ' +
          'cross one out when it is ruled out</span>' +
        '</div>' +
        '<div id="tiles" style="left:' + b.x + 'mm;top:' + b.y + 'mm;' +
          'width:' + b.w + 'mm;height:' + b.h + 'mm"></div>' +
      '</div>';

    if (tileMap) { tileMap.remove(); tileMap = null; }
    tileMap = L.map('tiles', { zoomControl: false, zoomSnap: 0.25, attributionControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd', maxZoom: 20, r: '@2x',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(tileMap);

    var bounds = L.latLngBounds([]);
    var dLat = RADIUS / 111320, dLon = RADIUS / (111320 * Math.cos(LAT0 * Math.PI / 180));
    STATIONS.forEach(function (st) {
      bounds.extend([st.lat + dLat, st.lon + dLon]).extend([st.lat - dLat, st.lon - dLon]);
      L.circle([st.lat, st.lon], {
        radius: RADIUS, color: '#0f172a', weight: 1.1, opacity: .9,
        fill: false, dashArray: st.m === 'tube' ? null : '4 3'
      }).addTo(tileMap);
      L.marker([st.lat, st.lon], {
        interactive: false,
        icon: L.divIcon({ className: 'pin', html: '<i></i>', iconSize: [7, 7], iconAnchor: [3.5, 3.5] })
      }).addTo(tileMap);
    });

    /* Labels live in their own overlay so they can be laid out without
       colliding — the same greedy placement the plain sheet uses, in pixels. */
    var overlay = document.createElement('div');
    overlay.id = 'pinlabels';
    document.getElementById('tiles').appendChild(overlay);

    function layoutLabels() {
      var FS = 8, placed = [], html = [];
      var pts = STATIONS.map(function (st) {
        var p = tileMap.latLngToContainerPoint([st.lat, st.lon]);
        return { x: p.x, y: p.y, n: st.n };
      });
      pts.forEach(function (p) {
        placed.push({ x1: p.x - 4, x2: p.x + 4, y1: p.y - 4, y2: p.y + 4 });
      });

      var cands = [];
      [[7, 0], [17, 1], [28, 2]].forEach(function (ring) {
        var d = ring[0];
        cands.push([ d, 3, 'left', ring[1]], [-d, 3, 'right', ring[1]],
                   [ 0, -d, 'center', ring[1]], [0, d + FS, 'center', ring[1]],
                   [ d, -d * 0.7, 'left', ring[1]], [-d, -d * 0.7, 'right', ring[1]],
                   [ d, d * 0.7 + 3, 'left', ring[1]], [-d, d * 0.7 + 3, 'right', ring[1]]);
      });
      function hit(a, b) { return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1); }

      var order = pts.map(function (p, i) {
        var near = 0;
        pts.forEach(function (q) { if (q !== p && Math.abs(q.x - p.x) < 70 && Math.abs(q.y - p.y) < 70) near++; });
        return { i: i, near: near };
      }).sort(function (a, b) { return b.near - a.near; });

      order.forEach(function (o) {
        var p = pts[o.i], w = p.n.length * FS * 0.56, best = null, bestHits = 1e9;
        for (var i = 0; i < cands.length; i++) {
          var x = p.x + cands[i][0], y = p.y + cands[i][1], al = cands[i][2];
          var x1 = al === 'left' ? x : al === 'right' ? x - w : x - w / 2;
          var b = { x1: x1 - 1, x2: x1 + w + 1, y1: y - FS, y2: y + 2 };
          var n = 0;
          for (var j = 0; j < placed.length; j++) if (hit(b, placed[j])) n++;
          if (n < bestHits) { bestHits = n; best = { x1: x1, y: y, box: b, lead: cands[i][3], px: p.x, py: p.y }; }
          if (n === 0) break;
        }
        placed.push(best.box);
        if (best.lead) {
          var lx = best.x1 + w / 2, ly = best.y - FS / 2;
          var len = Math.hypot(lx - best.px, ly - best.py);
          var ang = Math.atan2(ly - best.py, lx - best.px) * 180 / Math.PI;
          html.push('<i class="lead" style="left:' + best.px + 'px;top:' + best.py +
                    'px;width:' + len + 'px;transform:rotate(' + ang + 'deg)"></i>');
        }
        html.push('<b style="left:' + best.x1 + 'px;top:' + (best.y - FS) + 'px">' + p.n + '</b>');
      });
      overlay.innerHTML = html.join('');
    }

    tileMap.on('moveend zoomend', layoutLabels);
    tileMap.fitBounds(bounds, { padding: [4, 4] });
    setTimeout(function () {
      tileMap.invalidateSize();
      tileMap.fitBounds(bounds, { padding: [4, 4] });
      layoutLabels();
    }, 80);
  }

  window.addEventListener('beforeprint', function () { if (tileMap) tileMap.invalidateSize(); });

  function show(size) {
    var S = SIZES[size];
    document.getElementById('pagesize').textContent =
      '@page { size: ' + S.w + 'mm ' + S.h + 'mm; margin: 0 }';
    if (mode === 'streets') buildStreets(size); else
      document.getElementById('sheet').innerHTML = build(size);
    Array.prototype.forEach.call(document.querySelectorAll('#sizes button'), function (b) {
      b.classList.toggle('active', b.dataset.size === size);
    });
    document.title = 'Hide & Seek Zone 1 — ' + S.label;
  }

  var mode = 'plain', current = 'a4';

  document.getElementById('sizes').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-size]'); if (b) { current = b.dataset.size; show(current); }
  });
  document.getElementById('modes').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-mode]'); if (!b) return;
    mode = b.dataset.mode;
    Array.prototype.forEach.call(this.children, function (x) { x.classList.toggle('active', x === b); });
    show(current);
  });
  document.getElementById('btn-print').addEventListener('click', function () { window.print(); });

  var qs = new URLSearchParams(location.search);
  current = qs.get('size') === 'a3' ? 'a3' : 'a4';
  if (qs.get('mode') === 'streets') {
    mode = 'streets';
    document.querySelector('#modes button[data-mode="streets"]').classList.add('active');
    document.querySelector('#modes button[data-mode="plain"]').classList.remove('active');
  }
  show(current);
})();
