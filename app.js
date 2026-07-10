// app.js — USYD Portal behavior
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     AUDIO MANAGER
     Sound files are NOT bundled (copyright). Placeholders live at
     assets/*.mp3 — missing files fail silently, no errors.
     ============================================================ */
  var AudioManager = {
    muted: localStorage.getItem('usyd-portal-muted') === 'true',
    unlocked: false,
    files: {
      hover: 'assets/sfx.mp3',
      select: 'assets/sfx2.mp3',
      back: 'assets/sfx.mp3',
      error: 'assets/wrong.mp3'
    },
    cache: {},
    _get: function (name) {
      if (!this.cache[name]) {
        var a = new Audio(this.files[name]);
        a.volume = 0.5;
        a.addEventListener('error', function () { /* fail silently */ });
        this.cache[name] = a;
      }
      return this.cache[name];
    },
    play: function (name) {
      if (this.muted || !this.unlocked || !this.files[name]) return;
      try {
        var el = this._get(name);
        el.currentTime = 0;
        var p = el.play();
        if (p && p.catch) p.catch(function () { /* fail silently */ });
      } catch (e) { /* fail silently */ }
    },
    setMuted: function (val) {
      this.muted = val;
      localStorage.setItem('usyd-portal-muted', val ? 'true' : 'false');
    }
  };

  // Respect autoplay policy: only allow playback after first user gesture.
  function unlockAudioOnce() {
    AudioManager.unlocked = true;
    window.removeEventListener('pointerdown', unlockAudioOnce);
    window.removeEventListener('keydown', unlockAudioOnce);
  }
  window.addEventListener('pointerdown', unlockAudioOnce, { once: true });
  window.addEventListener('keydown', unlockAudioOnce, { once: true });

  /* ============================================================
     IMAGE FALLBACK HELPER
     Tries to load an image url; calls onOk(url) if it loads,
     onFail() if it 404s or is missing. Never throws.
     ============================================================ */
  function tryImage(url, onOk, onFail) {
    if (!url) { onFail(); return; }
    var img = new Image();
    img.onload = function () { onOk(url); };
    img.onerror = function () { onFail(); };
    img.src = url;
  }

  /* ============================================================
     STATE
     ============================================================ */
  var state = {
    categoryIndex: 0,      // focused coverflow category
    linkIndex: 0,           // focused row within current category
    linkHoverIndex: null,   // temp hover preview (sub-link list)
    query: '',
    filtered: [],           // active search results: {catIndex, linkIndex}
    filterFocus: 0
  };

  function isSearching() { return state.query.trim().length > 0; }

  /* ============================================================
     DOM REFS
     ============================================================ */
  var $panel = document.getElementById('focus-panel');
  var $panelHeader = document.querySelector('.panel-header');
  var $panelDivider = document.querySelector('.panel-divider');
  var $panelIcon = document.getElementById('panel-icon');
  var $panelTitle = document.getElementById('panel-title');
  var $panelDesc = document.getElementById('panel-desc');
  var $linkList = document.getElementById('link-list');
  var $noResults = document.getElementById('no-results');
  var $coverflow = document.getElementById('coverflow');
  var $searchInput = document.getElementById('search-input');
  var $muteBtn = document.getElementById('mute-toggle');
  var $muteOn = document.getElementById('mute-icon-on');
  var $muteOff = document.getElementById('mute-icon-off');

  /* ============================================================
     SEARCH / FILTER LOGIC
     ============================================================ */
  function computeFiltered(query) {
    var q = query.trim().toLowerCase();
    var results = [];
    PORTAL_DATA.forEach(function (cat, ci) {
      cat.links.forEach(function (link, li) {
        var hay = (link.name + ' ' + link.description + ' ' + cat.name).toLowerCase();
        if (hay.indexOf(q) !== -1) results.push({ catIndex: ci, linkIndex: li });
      });
    });
    return results;
  }

  /* ============================================================
     RENDER: TILE FALLBACK-AWARE BACKGROUND SETTER
     ============================================================ */
  function applyTileImage(el, url, letter) {
    var fallback = document.createElement('div');
    fallback.className = 'tile-fallback';
    fallback.textContent = letter;
    tryImage(url, function (okUrl) {
      el.style.backgroundImage = 'url(' + okUrl + ')';
    }, function () {
      el.appendChild(fallback);
    });
  }

  function applyIconImage(el, url, letter) {
    tryImage(url, function (okUrl) {
      el.style.backgroundImage = 'url(' + okUrl + ')';
      el.textContent = '';
      el.classList.remove('placeholder');
    }, function () {
      el.style.backgroundImage = 'none';
      el.textContent = letter;
      el.classList.add('placeholder');
    });
  }

  /* ============================================================
     RENDER: FOCUS PANEL
     ============================================================ */
  function renderPanel() {
    if (isSearching()) {
      $panelHeader.style.display = 'none';
      $panelDivider.style.display = 'none';
      renderFilteredList();
      return;
    }

    $panelHeader.style.display = '';
    $panelDivider.style.display = '';
    layoutCoverflow();

    var cat = PORTAL_DATA[state.categoryIndex];
    $panelTitle.textContent = cat.name;
    $panelDesc.textContent = cat.description;
    $panelIcon.style.backgroundImage = 'none';
    $panelIcon.textContent = '';
    $panelIcon.classList.remove('placeholder');
    applyIconImage($panelIcon, cat.tileImage, cat.name.charAt(0));

    renderCategoryList(cat);
  }

  function renderCategoryList(cat) {
    $noResults.hidden = true;
    $linkList.innerHTML = '';
    var effectiveFocus = state.linkHoverIndex !== null ? state.linkHoverIndex : state.linkIndex;

    cat.links.forEach(function (link, i) {
      var row = buildRow(link, i === effectiveFocus, null);
      row.style.animationDelay = (i * 60) + 'ms';
      row.addEventListener('mouseenter', function () {
        state.linkHoverIndex = i;
        updateRowFocusStyles();
      });
      row.addEventListener('mouseleave', function () {
        state.linkHoverIndex = null;
        updateRowFocusStyles();
      });
      row.addEventListener('click', function () {
        state.linkIndex = i;
        state.linkHoverIndex = null;
        activateLink(link);
      });
      $linkList.appendChild(row);
    });
  }

  function renderFilteredList() {
    state.filtered = computeFiltered(state.query);
    $linkList.innerHTML = '';

    if (state.filtered.length === 0) {
      $noResults.hidden = false;
      AudioManager.play('error');
      renderCoverflowSolo(null);
      return;
    }
    $noResults.hidden = true;

    if (state.filterFocus >= state.filtered.length) state.filterFocus = 0;

    state.filtered.forEach(function (res, i) {
      var cat = PORTAL_DATA[res.catIndex];
      var link = cat.links[res.linkIndex];
      var row = buildRow(link, i === state.filterFocus, cat.name);
      row.style.animationDelay = (i * 40) + 'ms';
      row.addEventListener('mouseenter', function () {
        state.filterFocus = i;
        updateRowFocusStyles();
        renderCoverflowSolo(cat);
      });
      row.addEventListener('click', function () {
        state.filterFocus = i;
        activateLink(link);
      });
      $linkList.appendChild(row);
    });

    var focusedCat = PORTAL_DATA[state.filtered[state.filterFocus].catIndex];
    renderCoverflowSolo(focusedCat);
  }

  function buildRow(link, focused, parentName) {
    var li = document.createElement('li');
    li.className = 'link-row' + (focused ? ' focused' : '') + (parentName ? ' filtered' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', focused ? 'true' : 'false');
    li.tabIndex = -1;

    var icon = document.createElement('div');
    icon.className = 'link-row-icon';
    applyIconImage(icon, link.icon, link.name.charAt(0));

    var labels = document.createElement('div');
    labels.className = 'link-row-labels';

    var name = document.createElement('span');
    name.className = 'link-row-name';
    name.textContent = link.name;
    labels.appendChild(name);

    if (parentName) {
      var parent = document.createElement('span');
      parent.className = 'link-row-parent';
      parent.textContent = parentName.toUpperCase();
      labels.appendChild(parent);
    }

    li.appendChild(icon);
    li.appendChild(labels);
    return li;
  }

  function updateRowFocusStyles() {
    var rows = $linkList.querySelectorAll('.link-row');
    var effectiveFocus = isSearching()
      ? state.filterFocus
      : (state.linkHoverIndex !== null ? state.linkHoverIndex : state.linkIndex);
    rows.forEach(function (row, i) {
      var wasFocused = row.classList.contains('focused');
      var nowFocused = i === effectiveFocus;
      row.classList.toggle('focused', nowFocused);
      row.setAttribute('aria-selected', nowFocused ? 'true' : 'false');
      if (nowFocused && !wasFocused) AudioManager.play('hover');
    });
  }

  function activateLink(link) {
    AudioManager.play('select');
    window.open(link.url, '_blank', 'noopener');
  }

  /* ============================================================
     RENDER: COVERFLOW
     ============================================================ */
  var tileEls = [];

  function buildCoverflow() {
    $coverflow.innerHTML = '';
    tileEls = PORTAL_DATA.map(function (cat, i) {
      var tile = document.createElement('div');
      tile.className = 'tile';
      tile.setAttribute('role', 'listitem');
      tile.setAttribute('aria-label', cat.name);
      tile.tabIndex = -1;

      applyTileImage(tile, cat.tileImage, cat.name.charAt(0));

      var label = document.createElement('div');
      label.className = 'tile-name';
      label.textContent = cat.name;
      tile.appendChild(label);

      tile.addEventListener('click', function () {
        if (isSearching()) return;
        focusCategory(i);
      });

      $coverflow.appendChild(tile);
      return tile;
    });

    // Staggered pop-in, then settle into correct coverflow formation.
    tileEls.forEach(function (tile, i) {
      var delay = reduceMotion ? 0 : i * 60;
      setTimeout(function () { tile.style.opacity = '1'; }, delay + 20);
    });
    setTimeout(layoutCoverflow, reduceMotion ? 0 : tileEls.length * 60 + 60);
  }

  function layoutCoverflow() {
    if (isSearching()) return; // solo mode handles its own visibility
    tileEls.forEach(function (tile, i) {
      tile.style.display = '';
      var delta = i - state.categoryIndex;
      var sign = delta === 0 ? 0 : (delta > 0 ? 1 : -1);
      var abs = Math.abs(delta);
      var offset = delta * 185;
      // Curved path: tiles sink along a shallow arc as they move away from center,
      // rather than sliding along a flat horizontal line.
      var curveY = Math.pow(abs, 1.6) * 16;
      var rotate = sign * (14 + abs * 2);
      var scale = delta === 0 ? 1 : Math.max(0.6, 0.78 - abs * 0.04);
      var opacity = delta === 0 ? 1 : (abs > 4 ? 0 : 0.55 - abs * 0.05);
      var z = 100 - abs;

      tile.style.zIndex = z;
      tile.style.transform = 'translateX(' + offset + 'px) translateY(' + curveY + 'px) rotateY(' + rotate + 'deg) scale(' + scale + ')';
      tile.style.opacity = Math.max(opacity, 0);
      tile.style.filter = delta === 0 ? 'saturate(1)' : 'saturate(0.35)';
      tile.style.boxShadow = delta === 0 ? '0 0 24px 2px rgba(255,122,26,0.5)' : 'none';
      tile.style.pointerEvents = abs > 4 ? 'none' : 'auto';
    });
  }

  function renderCoverflowSolo(cat) {
    tileEls.forEach(function (tile, i) {
      var catData = PORTAL_DATA[i];
      var match = cat && catData.id === cat.id;
      tile.style.display = match ? '' : 'none';
      if (match) {
        tile.style.zIndex = 50;
        tile.style.transform = 'translateX(0) translateY(0) rotateY(0deg) scale(1)';
        tile.style.opacity = '1';
        tile.style.filter = 'saturate(1)';
        tile.style.boxShadow = '0 0 24px 2px rgba(255,122,26,0.5)';
        tile.style.pointerEvents = 'none';
      }
    });
  }

  function focusCategory(index) {
    state.categoryIndex = index;
    state.linkIndex = 0;
    state.linkHoverIndex = null;
    AudioManager.play('select');
    layoutCoverflow();
    renderPanel();
  }

  /* ============================================================
     KEYBOARD NAVIGATION
     ============================================================ */
  function currentListLength() {
    return isSearching() ? state.filtered.length : PORTAL_DATA[state.categoryIndex].links.length;
  }

  function moveVertical(dir) {
    var len = currentListLength();
    if (len === 0) return;
    if (isSearching()) {
      state.filterFocus = (state.filterFocus + dir + len) % len;
      var cat = PORTAL_DATA[state.filtered[state.filterFocus].catIndex];
      renderCoverflowSolo(cat);
    } else {
      state.linkIndex = (state.linkIndex + dir + len) % len;
      state.linkHoverIndex = null;
    }
    updateRowFocusStyles();
    scrollFocusedRowIntoView();
  }

  function moveHorizontal(dir) {
    if (isSearching()) return;
    var len = PORTAL_DATA.length;
    focusCategory((state.categoryIndex + dir + len) % len);
  }

  function scrollFocusedRowIntoView() {
    var focused = $linkList.querySelector('.link-row.focused');
    if (focused) focused.scrollIntoView({ block: 'nearest' });
  }

  function activateFocused() {
    if (isSearching()) {
      if (state.filtered.length === 0) return;
      var res = state.filtered[state.filterFocus];
      activateLink(PORTAL_DATA[res.catIndex].links[res.linkIndex]);
    } else {
      var cat = PORTAL_DATA[state.categoryIndex];
      if (cat.links.length === 0) return;
      activateLink(cat.links[state.linkIndex]);
    }
  }

  window.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    var typing = tag === 'INPUT' && document.activeElement !== null && document.activeElement.type === 'text';

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        moveVertical(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveVertical(1);
        break;
      case 'ArrowLeft':
        if (typing) return;
        e.preventDefault();
        moveHorizontal(-1);
        break;
      case 'ArrowRight':
        if (typing) return;
        e.preventDefault();
        moveHorizontal(1);
        break;
      case 'w': case 'W':
        if (typing) return;
        moveVertical(-1);
        break;
      case 's': case 'S':
        if (typing) return;
        moveVertical(1);
        break;
      case 'a': case 'A':
        if (typing) return;
        moveHorizontal(-1);
        break;
      case 'd': case 'D':
        if (typing) return;
        moveHorizontal(1);
        break;
      case 'Enter':
      case ' ':
        if (typing) return;
        e.preventDefault();
        activateFocused();
        break;
      default:
        break;
    }
  });

  /* ============================================================
     SEARCH INPUT
     ============================================================ */
  $searchInput.addEventListener('input', function () {
    state.query = $searchInput.value;
    state.filterFocus = 0;
    renderPanel();
  });

  /* ============================================================
     MUTE TOGGLE
     ============================================================ */
  function refreshMuteUI() {
    $muteBtn.classList.toggle('is-muted', AudioManager.muted);
    $muteBtn.setAttribute('aria-pressed', AudioManager.muted ? 'true' : 'false');
    $muteBtn.setAttribute('aria-label', AudioManager.muted ? 'Unmute sound' : 'Mute sound');
    $muteOn.hidden = AudioManager.muted;
    $muteOff.hidden = !AudioManager.muted;
  }
  $muteBtn.addEventListener('click', function () {
    AudioManager.setMuted(!AudioManager.muted);
    refreshMuteUI();
  });
  refreshMuteUI();

  /* ============================================================
     CANVAS BACKGROUND — starfield + PS3 XMB-style particle wave
     ============================================================ */
  (function backgroundCanvas() {
    var canvas = document.getElementById('bg-canvas');
    var ctx = canvas.getContext('2d');
    var w, h, dpr;
    var stars = [];
    var waveParticles = [];
    var running = true;

    // Wave "ribbon" layers — each a translucent flowing band built from
    // stacked sine components, like the XMB cross-media-bar backdrop.
    var waveLayers = [
      { baseFrac: 0.66, amp: 46, freq: 0.0021, freq2: 0.0047, speed: 0.00030, speed2: 0.00061, color: '255,122,26', alpha: 0.16 },
      { baseFrac: 0.74, amp: 60, freq: 0.0015, freq2: 0.0035, speed: -0.00022, speed2: 0.00048, color: '58,220,224', alpha: 0.13 },
      { baseFrac: 0.82, amp: 34, freq: 0.0027, freq2: 0.0060, speed: 0.00038, speed2: -0.00070, color: '255,122,26', alpha: 0.10 }
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
      initWaveParticles();
    }

    function initStars() {
      stars = [];
      var count = 150;
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1 + 1,
          speed: Math.random() * 4 + 4,
          angle: Math.PI * 1.5 + (Math.random() - 0.5) * 0.6,
          phase: Math.random() * Math.PI * 2,
          period: Math.random() * 3 + 3,
          cyan: Math.random() < 0.3
        });
      }
    }

    function drawStars(t) {
      stars.forEach(function (s) {
        if (!reduceMotion) {
          s.x += Math.cos(s.angle) * s.speed / 60;
          s.y += Math.sin(s.angle) * s.speed / 60;
          if (s.y < -5) s.y = h + 5;
          if (s.x < -5) s.x = w + 5;
          if (s.x > w + 5) s.x = -5;
        }
        var twinkle = reduceMotion ? 0.7 : (0.35 + 0.65 * (0.5 + 0.5 * Math.sin((t / 1000) * (2 * Math.PI / s.period) + s.phase)));
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = s.cyan ? '#3ADCE0' : '#F2F5FA';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    // Height of a given wave layer at horizontal position x and time t.
    function waveY(layer, x, t) {
      var base = h * layer.baseFrac;
      var a = Math.sin(x * layer.freq + t * layer.speed) * layer.amp;
      var b = Math.sin(x * layer.freq2 + t * layer.speed2) * layer.amp * 0.35;
      return base + a + b;
    }

    function drawWaves(t) {
      waveLayers.forEach(function (layer) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, waveY(layer, 0, t));
        var step = Math.max(4, Math.floor(w / 220));
        for (var x = 0; x <= w; x += step) {
          ctx.lineTo(x, waveY(layer, x, t));
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        var grad = ctx.createLinearGradient(0, h * layer.baseFrac - layer.amp, 0, h);
        grad.addColorStop(0, 'rgba(' + layer.color + ',' + layer.alpha + ')');
        grad.addColorStop(1, 'rgba(' + layer.color + ',0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Crest highlight — a thin glowing line along the top of the ribbon.
        ctx.beginPath();
        ctx.moveTo(0, waveY(layer, 0, t));
        for (var xi = 0; xi <= w; xi += step) {
          ctx.lineTo(xi, waveY(layer, xi, t));
        }
        ctx.strokeStyle = 'rgba(' + layer.color + ',' + Math.min(1, layer.alpha + 0.35) + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // Small glowing particles that ride along the wave crests, drifting
    // sideways and bobbing gently off the surface — the "particle" half
    // of the classic PS3 XMB wave backdrop.
    function initWaveParticles() {
      waveParticles = [];
      var count = Math.round((w / 1400) * 60);
      for (var i = 0; i < count; i++) {
        var layerIndex = Math.floor(Math.random() * waveLayers.length);
        waveParticles.push({
          x: Math.random() * w,
          layerIndex: layerIndex,
          drift: (Math.random() * 18 + 6) * (Math.random() < 0.5 ? -1 : 1),
          lift: Math.random() * 26 + 4,
          r: Math.random() * 1.6 + 0.8,
          phase: Math.random() * Math.PI * 2,
          period: Math.random() * 2.5 + 2,
          cyan: Math.random() < 0.4
        });
      }
    }

    function drawWaveParticles(t) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      waveParticles.forEach(function (p) {
        if (!reduceMotion) {
          p.x += p.drift / 60;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
        var layer = waveLayers[p.layerIndex];
        var surfaceY = waveY(layer, p.x, t);
        var bob = reduceMotion ? 0 : Math.sin((t / 1000) * (2 * Math.PI / p.period) + p.phase) * 4;
        var y = surfaceY - p.lift + bob;
        var twinkle = reduceMotion ? 0.6 : (0.4 + 0.6 * (0.5 + 0.5 * Math.sin((t / 1000) * (2 * Math.PI / p.period) + p.phase)));

        ctx.globalAlpha = twinkle * 0.9;
        ctx.fillStyle = p.cyan ? '#3ADCE0' : '#FF7A1A';
        ctx.beginPath();
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // soft glow halo
        ctx.globalAlpha = twinkle * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      drawStars(t);
      drawWaves(t);
      drawWaveParticles(t);
      requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(frame);
  })();

  /* ============================================================
     INIT
     ============================================================ */
  buildCoverflow();
  layoutCoverflow();
  renderPanel();

})();
