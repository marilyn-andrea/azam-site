/* ============================================================
   main.js — rend la page à partir de content.js, puis branche
   les interactions (seuil, lecteur, vidéos, vœu).
   JavaScript vanilla, aucune dépendance.
   ============================================================ */
(function () {
  "use strict";
  var C = window.CONTENT;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function has(s) { return typeof s === "string" && s.replace(/\s+/g, "") !== "" && !/\[[^\]]*\]/.test(s); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function pic(name, w, h, alt, cls, eager) {
    return '<picture><source type="image/webp" srcset="images/' + name + '.webp">' +
      '<img class="' + (cls || "") + '" src="images/' + name + '.jpg" width="' + w + '" height="' + h + '" alt="' + esc(alt) + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></picture>';
  }
  var ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1.5v13l11-6.5z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h3.4v12H3zM9.6 2H13v12H9.6z"/></svg>';
  var ICON_PREV = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2h2v12H2zM14 1.8v12.4L5.5 8z"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12 2h2v12h-2zM2 1.8v12.4L10.5 8z"/></svg>';

  /* ---------- Sections présentes (la numérotation s'adapte) ---------- */
  var hasObs = C.observations && C.observations.items && C.observations.items.filter(has).length > 0;
  var obsItems = hasObs ? C.observations.items.filter(has) : [];
  var order = ["cover", "edito", "archives", "fragments", "playlist"];
  if (hasObs) order.push("observations");
  order.push("lettre", "voeu", "colophon");
  var total = order.length;
  function head(id, label) {
    var n = order.indexOf(id) + 1;
    return '<div class="page-head rv"><span class="label">' + esc(label) + '</span><span class="label num">' + pad(n) + ' / ' + pad(total) + '</span></div>';
  }
  function marge(text, tone) {
    if (!has(text)) return "";
    return '<aside class="marge ' + tone + '" aria-label="Pensée de marge"><div class="wrap"><div class="in rv"><span class="label">En marge</span><p>' + esc(text) + '</p></div></div></aside>';
  }

  /* ---------- Rendu ---------- */
  var h = [];

  // 00 — seuil
  h.push(
    '<div id="gate" role="dialog" aria-modal="true" aria-label="' + esc(C.gate.edition) + '">' +
      '<p class="label g-top">' + esc(C.gate.edition) + '</p>' +
      '<div class="g-mid"><div class="g-name" aria-hidden="true"><span class="g-word">' + esc(C.gate.monogram) + '</span><span class="g-orn"><i></i><b></b><i></i></span></div>' +
        '<div class="g-btns">' +
          '<button class="btn btn-solid" id="open-sound" type="button">' + esc(C.gate.withSound) + '</button>' +
          '<button class="btn-text" id="open-silent" type="button">' + esc(C.gate.silent) + '</button>' +
        '</div></div>' +
      '<p class="label g-bot" style="opacity:.6">' + esc(C.gate.note) + '</p>' +
    '</div>'
  );

  h.push('<div class="mast" id="mast" aria-hidden="true"><span class="mono">' + esc(C.gate.monogram) + '</span><span class="label pg" id="pg">01 <i>/ ' + pad(total) + '</i></span></div>');
  h.push('<main id="main" tabindex="-1">');

  // 01 — couverture
  h.push(
    '<section class="page dark" id="cover" data-sec="cover" aria-label="Couverture">' +
      '<div class="cover-20" aria-hidden="true" data-t="20">20</div>' +
      '<div class="wrap"><div class="grid cover-grid">' +
        '<div class="cover-label label"><span>' + esc(C.cover.label) + '</span></div>' +
        '<figure class="cover-fig rv">' + pic("cover", 1280, 960, C.cover.alt, "", true) +
          '</figure>' +
        '<div class="cover-text rv" style="--d:150ms"><h1 class="h-xl">' + esc(C.cover.title) + '</h1>' +
          '<p class="cover-sub">' + esc(C.cover.subtitle) + '</p>' +
          '<div class="scroll-ind" aria-hidden="true"><span class="ln"></span><span class="label">' + esc(C.cover.scroll) + '</span></div></div>' +
      '</div></div>' +
    '</section>'
  );

  // 02 — édito
  h.push(
    '<section class="page light" id="edito" data-sec="edito" aria-labelledby="t-edito"><div class="wrap">' + head("edito", C.edito.label) +
      '<div class="grid">' +
        '<h2 class="h-md edito-title rv" id="t-edito">' + esc(C.edito.title) + '</h2>' +
        '<div class="edito-body">' +
          C.edito.paragraphs.filter(has).map(function (p, i) { return '<p class="rv" style="--d:' + (i * 90) + 'ms">' + esc(p) + '</p>'; }).join("") +
          (has(C.edito.signature) ? '<div class="signature rv"><span>' + esc(C.edito.signature) + '</span></div>' : "") +
        '</div>' +
      '</div></div></section>'
  );
  h.push(marge(C.marginalia.afterEdito, "light"));

  // 03 — archives
  var A = C.archives;
  h.push(
    '<section class="page cacao" id="archives" data-sec="archives" aria-labelledby="t-arch"><div class="wrap">' + head("archives", A.label) +
      '<div class="grid">' +
        '<h2 class="h-lg arch-title rv" id="t-arch">' + esc(A.title) + '</h2>' +
        '<figure class="arch-fig rv" style="--d:100ms">' + pic(A.image.name, A.image.w, A.image.h, A.image.alt) + '</figure>' +
        '<p class="arch-cap rv"><span class="label">Archive n° 01</span>' + esc(A.caption) + '</p>' +
      '</div></div></section>'
  );

  // 04 — fragments
  var F = C.fragments;
  var figs = F.items.map(function (it) {
    var media;
    if (it.kind === "image") {
      media = '<div class="media" style="aspect-ratio:' + it.w + '/' + it.h + '">' + pic(it.name, it.w, it.h, it.alt) + '</div>';
    } else {
      media = '<div class="media" style="aspect-ratio:' + it.w + '/' + it.h + '">' +
        '<video muted loop playsinline preload="none" disablepictureinpicture poster="videos/' + it.name + '-poster.jpg" width="' + it.w + '" height="' + it.h + '" data-auto="' + (it.autoplay ? "1" : "0") + '" aria-label="' + esc(it.alt) + '">' +
        '<source src="videos/' + it.name + '.mp4" type="video/mp4"></video>' +
        '<button class="vbtn" type="button" aria-label="' + esc(F.play) + ' — ' + esc(it.fig) + '"><span class="ico">' +
          '<span class="i-play">' + ICON_PLAY + '</span><span class="i-pause">' + ICON_PAUSE + '</span></span></button></div>';
    }
    return '<figure class="f-' + it.id + ' l-' + esc(it.layout || "a") + ' rv" data-kind="' + it.kind + '">' + media +
      '<figcaption><span class="label">' + esc(it.fig) + '</span><span>' + esc(it.text) + '</span></figcaption></figure>';
  }).join("");
  h.push(
    '<section class="page light" id="fragments" data-sec="fragments" aria-labelledby="t-frag"><div class="wrap">' + head("fragments", F.label) +
      '<h2 class="h-lg rv" id="t-frag" style="margin-bottom:clamp(36px,6vw,80px)">' + esc(F.title) + '</h2>' +
      '<div class="grid frag">' + figs + '</div></div></section>'
  );
  h.push(marge(C.marginalia.afterFragments, "light"));

  // 05 — playlist
  var P = C.playlist;
  var tracks = P.tracks.map(function (t, i) {
    return '<li class="track" data-i="' + i + '">' +
      '<span class="n" aria-hidden="true">' + pad(i + 1) + '</span>' +
      '<span class="thumb" aria-hidden="true" data-yt="' + esc(t.youtube) + '"></span>' +
      '<div class="meta"><div class="t" data-now="' + esc(P.nowPlaying) + '">' + esc(t.title) + '</div>' +
        '<div class="a label">' + esc(t.artist) + '</div><p class="ln">' + esc(t.note) + '</p></div>' +
      '<button class="go" type="button" aria-label="' + esc(P.play) + ' : ' + esc(t.title) + ' — ' + esc(t.artist) + '">' + ICON_PLAY + '</button></li>';
  }).join("");
  h.push(
    '<section class="page dark" id="playlist" data-sec="playlist" aria-labelledby="t-pl"><div class="wrap">' + head("playlist", P.label) +
      '<div class="grid">' +
        '<div class="pl-head rv"><h2 class="h-lg" id="t-pl">' + esc(P.title) + '</h2></div>' +
        '<p class="pl-intro rv">' + esc(P.intro) + '</p>' +
        '<ol class="tracks rv">' + tracks + '</ol>' +
        '<p class="credits">' + esc(P.credits) + '</p>' +
      '</div></div></section>'
  );

  // 06 — observations (seulement si fournies)
  if (hasObs) {
    var O = C.observations;
    h.push(
      '<section class="page light" id="observations" data-sec="observations" aria-labelledby="t-obs"><div class="wrap">' + head("observations", O.label) +
        '<div class="grid"><h2 class="h-md obs-title rv" id="t-obs">' + esc(O.title) + '</h2>' +
        '<ol class="obs">' + obsItems.map(function (t, i) { return '<li class="rv" style="--d:' + (i * 60) + 'ms"><span class="n" aria-hidden="true">' + pad(i + 1) + '</span><span class="tx">' + esc(t) + '</span></li>'; }).join("") + '</ol></div></div></section>'
    );
  }

  // 07 — lettre
  var L = C.lettre;
  var letterParas = [].concat(L.before || []);
  if (has(L.detail)) letterParas.push("Tu as cette façon de " + L.detail.replace(/^\s+|[\s.]+$/g, "") + " que tout le monde finit par remarquer.");
  letterParas = letterParas.concat(L.after || []).filter(has);
  h.push(
    '<section class="page light" id="lettre" data-sec="lettre" aria-labelledby="t-let"><div class="wrap">' + head("lettre", L.label) +
      '<h2 class="h-lg lettre-title rv" id="t-let">' + esc(L.title) + '</h2>' +
      '<article class="sheet rv" style="--d:100ms"><p class="greet">' + esc(L.greeting) + '</p>' +
        letterParas.map(function (p, i) { return '<p' + (i === 0 ? ' class="first"' : '') + '>' + esc(p) + '</p>'; }).join("") +
        '<p class="sig">' + esc(L.signature) + '</p>' +
        (has(L.ps) ? '<p class="ps">' + esc(L.ps) + '</p>' : "") +
      '</article></div></section>'
  );

  // 08 — vœu
  var V = C.voeu;
  var cx = [], n = V.candles || 4, x0 = 110, x1 = 210;
  for (var i = 0; i < n; i++) cx.push(n === 1 ? 160 : Math.round(x0 + (x1 - x0) * i / (n - 1)));
  var candles = cx.map(function (x, i) {
    return '<g class="candle" role="button" tabindex="0" aria-label="' + esc(V.candleLabel) + ' ' + (i + 1) + '" data-i="' + i + '">' +
      '<rect class="hit" x="' + (x - 14) + '" y="74" width="28" height="80" fill="transparent" stroke="none"/>' +
      '<rect x="' + (x - 4) + '" y="118" width="8" height="32" rx="1"/>' +
      '<path d="M' + x + ' 118v-6"/>' +
      '<circle class="glow" cx="' + x + '" cy="98" r="22"/>' +
      '<path class="flame" d="M' + x + ' 112c-7-8-5-17 0-25c5 8 7 17 0 25z"/>' +
      '<path class="smoke" d="M' + x + ' 108c-5-8 5-12 0-20c-3-5 2-9 0-14"/>' +
    '</g>';
  }).join("");
  h.push(
    '<section class="page dark voeu" id="voeu" data-sec="voeu" aria-labelledby="t-voeu"><div class="wrap">' + head("voeu", V.label) +
      '<h2 class="h-md rv" id="t-voeu">' + esc(V.title) + '</h2>' +
      '<p class="voeu-hint rv" id="voeu-hint">' + esc(V.hint) + '</p>' +
      '<div class="cake-wrap rv" id="cake-wrap">' +
        '<svg class="cake" viewBox="0 0 320 290" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="group" aria-label="Gâteau avec ' + n + ' bougies">' +
          '<path d="M24 262H296"/><path d="M52 272H268" opacity=".45"/>' +
          '<path d="M60 262V196H260V262"/><path d="M60 214q12.5 14 25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0"/>' +
          '<path d="M90 196V150H230V196"/><path d="M90 168q11.67 12 23.33 0t23.33 0t23.33 0t23.33 0t23.33 0t23.33 0"/>' +
          '<path d="M60 238h200" opacity=".35" stroke-dasharray="2 7"/>' +
          candles +
        '</svg></div>' +
      '<div class="voeu-done" aria-live="polite"><p class="final" id="final">' + esc(V.done) + '</p>' +
        (has(V.after) ? '<p class="after">' + esc(V.after) + '</p>' : "") +
        '<button class="btn btn-line" id="replay" type="button">' + esc(V.replay) + '</button></div>' +
    '</div></section>'
  );

  // 09 — colophon
  var K = C.colophon;
  h.push(
    '<section class="page cacao colo" id="colophon" data-sec="colophon" aria-label="' + esc(K.label) + '"><div class="wrap">' + head("colophon", K.label) +
      '<div class="mono rv" aria-hidden="true">' + esc(C.gate.monogram) + '</div>' +
      '<p class="label date rv">' + esc(K.date) + '</p>' +
      '<p class="t rv">' + esc(K.text) + '</p>' +
      '<div class="drawer rv"><button class="star" id="star" type="button" aria-expanded="false" aria-controls="drawer" aria-label="' + esc(K.drawerButton) + '"><span class="glyph" aria-hidden="true">*</span><span class="lbl">' + esc(K.drawerButton) + '</span></button>' +
        '<div class="drawer-panel" id="drawer"><div><p>' + esc(K.drawer) + '</p></div></div></div>' +
    '</div></section>'
  );
  h.push('</main>');

  // Dock lecteur
  h.push(
    '<div class="dock" id="dock" role="region" aria-label="Lecteur de musique">' +
      '<div class="screen"><span class="idle" id="screen-idle" aria-hidden="true">♪</span></div>' +
      '<div class="info"><div class="st label"><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span id="dock-state">' + esc(P.paused) + '</span></div>' +
        '<div class="ti" id="dock-title" aria-live="polite"></div></div>' +
      '<div class="ctl">' +
        '<button type="button" id="b-prev" aria-label="' + esc(P.prev) + '">' + ICON_PREV + '</button>' +
        '<button type="button" id="b-play" class="pp" aria-label="' + esc(P.play) + '"><span class="i-play">' + ICON_PLAY + '</span><span class="i-pause">' + ICON_PAUSE + '</span></button>' +
        '<button type="button" id="b-next" aria-label="' + esc(P.next) + '">' + ICON_NEXT + '</button>' +
      '</div>' +
      '<a class="yt-link" id="yt-link" target="_blank" rel="noopener noreferrer">' + esc(P.listen) + '</a>' +
    '</div>'
  );
  h.push('<canvas id="confetti" aria-hidden="true"></canvas>');

  $("#app").innerHTML = h.join("");
  document.title = C.meta.title;
  var main = $("#main");
  main.setAttribute("inert", "");
  main.setAttribute("aria-hidden", "true");

  /* ---------- Lecteur (YouTube embarqué, chargé au premier clic) ---------- */
  var Player = (function () {
    var tr = C.playlist.tracks, idx = 0, frame = null, audio = null, playing = false, errs = 0;
    var dock = $("#dock"), title = $("#dock-title"), stateEl = $("#dock-state"), pp = $("#b-play"), link = $("#yt-link"), screen = $(".screen", dock), idle = $("#screen-idle");
    var rows = $$(".track");
    var VOL = 0.5;

    function hasSrc(t) { return typeof t.src === "string" && t.src.replace(/\s+/g, "") !== "" && !t._noaudio; }
    function ytUrl(t) { return t.youtube ? "https://www.youtube.com/watch?v=" + t.youtube : ""; }
    function ui() {
      dock.classList.toggle("playing", playing);
      stateEl.textContent = playing ? C.playlist.nowPlaying : C.playlist.paused;
      pp.setAttribute("aria-label", playing ? C.playlist.pause : C.playlist.play);
      rows.forEach(function (r, i) { r.classList.toggle("is-current", i === idx && (!!frame || !!audio)); });
      title.innerHTML = esc(tr[idx].title) + "<small>" + esc(tr[idx].artist) + "</small>";
      var u = ytUrl(tr[idx]); link.href = u || "#"; link.style.display = (u && dock.classList.contains("err")) ? "block" : "";
    }

    /* ---------- Mode fichier audio (recommandé) ---------- */
    function ensureAudio() {
      if (audio) return audio;
      audio = new Audio();
      audio.preload = "auto";
      audio.volume = VOL;
      audio.setAttribute("playsinline", "");
      audio.addEventListener("playing", function () { playing = true; errs = 0; dock.classList.remove("err"); ui(); });
      audio.addEventListener("pause", function () { playing = false; ui(); });
      audio.addEventListener("ended", function () { playing = false; next(); });
      audio.addEventListener("error", function () {
        var t = tr[idx];
        t._noaudio = true;                         // fichier introuvable : on bascule sur YouTube si possible
        if (t.youtube) { load(idx, true); } else { fail(); }
      });
      return audio;
    }
    function stopAudio() { if (audio) { try { audio.pause(); } catch (e) {} } }
    function stopFrame() { if (frame) { frame.remove(); frame = null; } idle.style.display = ""; }

    /* ---------- Mode YouTube (secours) ---------- */
    function post(msg) { if (frame && frame.contentWindow) { try { frame.contentWindow.postMessage(JSON.stringify(msg), "*"); } catch (e) {} } }
    function cmd(f, a) { post({ event: "command", func: f, args: a || [] }); }
    function onLoad() {
      post({ event: "listening", id: 1, channel: "widget" });
      [200, 900, 2200].forEach(function (d) { setTimeout(function () { post({ event: "listening", id: 1, channel: "widget" }); cmd("setVolume", [Math.round(VOL * 100)]); }, d); });
    }
    window.addEventListener("message", function (e) {
      if (!frame || e.source !== frame.contentWindow) return;
      var d = e.data;
      if (typeof d === "string") { try { d = JSON.parse(d); } catch (x) { return; } }
      if (!d || typeof d !== "object") return;
      var st = null;
      if (d.event === "infoDelivery" && d.info && d.info.videoData && d.info.videoData.title) { if (!titleOk(d.info.videoData.title)) { fail(); return; } }
      if (d.event === "onStateChange") st = d.info;
      else if (d.event === "infoDelivery" && d.info && typeof d.info.playerState !== "undefined") st = d.info.playerState;
      else if (d.event === "onError") { fail(); return; }
      if (st === null) return;
      if (st === 1) { playing = true; errs = 0; cmd("setVolume", [Math.round(VOL * 100)]); ui(); }
      else if (st === 2 || st === -1 || st === 5) { playing = false; ui(); }
      else if (st === 0) { playing = false; next(); }
    });
    function norm(x) { return String(x || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
    function titleOk(t) {
      var ex = tr[idx].expect;
      if (!ex || !ex.length) return true;
      var n = norm(t);
      return ex.some(function (w) { return n.indexOf(norm(w)) !== -1; });
    }

    /* ---------- Commun ---------- */
    function load(i, autoplay) {
      idx = (i + tr.length) % tr.length;
      var t = tr[idx];
      dock.classList.remove("err");
      playing = false;
      if (hasSrc(t)) {
        stopFrame();
        var a = ensureAudio();
        a.src = t.src;
        a.volume = VOL;
        if (autoplay) { var p = a.play(); if (p && p.catch) p.catch(function () { playing = false; ui(); }); }
        ui();
        return;
      }
      if (!t.youtube) { fail(); return; }
      stopAudio();
      var src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(t.youtube) +
        "?autoplay=" + (autoplay ? 1 : 0) + "&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1" +
        (/^https?:/.test(location.protocol) ? "&origin=" + encodeURIComponent(location.origin) : "");
      if (!frame) {
        frame = document.createElement("iframe");
        frame.title = "Lecteur musique";
        frame.setAttribute("allow", "autoplay; encrypted-media");
        frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        frame.addEventListener("load", onLoad);
        screen.appendChild(frame);
        idle.style.display = "none";
      }
      frame.src = src;
      ui();
    }
    function fail() {
      errs++;
      playing = false;
      dock.classList.add("err");
      ui();
      if (errs < tr.length) setTimeout(function () { load(idx + 1, true); }, 1200);
    }
    function isActive() { return !!audio && hasSrc(tr[idx]) ? true : !!frame; }
    function toggle() {
      var t = tr[idx];
      if (hasSrc(t)) {
        var a = ensureAudio();
        if (!a.src || a.src.indexOf(t.src) === -1) { load(idx, true); return; }
        if (a.paused) { var p = a.play(); if (p && p.catch) p.catch(function () {}); } else { a.pause(); }
        return;
      }
      if (!frame) { load(idx, true); } else if (playing) { cmd("pauseVideo"); playing = false; ui(); } else { cmd("playVideo"); }
    }
    function next() { load(idx + 1, true); }
    function prev() { load(idx - 1, true); }
    function show() { dock.classList.add("show"); }
    pp.addEventListener("click", toggle);
    $("#b-next").addEventListener("click", next);
    $("#b-prev").addEventListener("click", prev);
    rows.forEach(function (r) {
      r.querySelector(".go").addEventListener("click", function () {
        var i = +r.getAttribute("data-i");
        if (i === idx && isActive()) toggle(); else load(i, true);
      });
    });
    ui();
    return { show: show, play: function () { load(0, true); } };
  })();

  // Vignettes (chargées en différé quand la playlist approche)
  var thumbsDone = false;
  function loadThumbs() {
    if (thumbsDone) return; thumbsDone = true;
    $$(".thumb").forEach(function (el) {
      var id = el.getAttribute("data-yt"); if (!id) return;
      var img = new Image();
      img.onload = function () { el.style.backgroundImage = 'url("' + img.src + '")'; };
      img.referrerPolicy = "no-referrer";
      img.src = "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/mqdefault.jpg";
    });
  }

  /* ---------- Seuil ---------- */
  var gate = $("#gate"), mast = $("#mast"), opened = false;
  function openEdition(withSound) {
    if (opened) return; opened = true;
    if (withSound) Player.play(); // dans le geste utilisateur : requis par iOS
    gate.classList.add("open");
    document.body.classList.remove("is-locked");
    main.removeAttribute("inert"); main.removeAttribute("aria-hidden");
    window.scrollTo(0, 0);
    setTimeout(function () { gate.style.display = "none"; main.focus({ preventScroll: true }); mast.classList.add("show"); Player.show(); }, reduce ? 0 : 820);
    revealVisible();
  }
  $("#open-sound").addEventListener("click", function () { openEdition(true); });
  $("#open-silent").addEventListener("click", function () { openEdition(false); });
  setTimeout(function () { try { $("#open-sound").focus({ preventScroll: true }); } catch (e) {} }, 60);

  /* ---------- Révélations ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
  function revealVisible() {
    $$(".rv, .frag figure").forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
  }
  if (!io) $$(".rv, .frag figure").forEach(function (el) { el.classList.add("in"); });

  /* ---------- Pagination + ton de l'en-tête ---------- */
  var secs = $$("section.page"), pg = $("#pg");
  function updateMast() {
    var y = window.innerHeight * 0.3, cur = secs[0];
    secs.forEach(function (s) { if (s.getBoundingClientRect().top <= y) cur = s; });
    var n = secs.indexOf(cur) + 1;
    pg.innerHTML = pad(n) + " <i>/ " + pad(secs.length) + "</i>";
    var dark = cur.classList.contains("dark") || cur.classList.contains("cacao");
    mast.classList.toggle("on-dark", dark);
    var pl = $("#playlist").getBoundingClientRect();
    if (pl.top < window.innerHeight * 1.6) loadThumbs();
  }
  var ticking = false;
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { updateMast(); ticking = false; }); } }, { passive: true });
  window.addEventListener("resize", updateMast);
  updateMast();

  /* ---------- Vidéos ---------- */
  var vids = $$("video");
  function setPlaying(v, on) { var f = v.closest("figure"); if (f) f.classList.toggle("playing", on); }
  function vplay(v) { var p = v.play(); if (p && p.catch) p.catch(function () { setPlaying(v, false); }); setPlaying(v, true); }
  function vpause(v) { v.pause(); setPlaying(v, false); }
  vids.forEach(function (v) {
    v.muted = true; v.defaultMuted = true; v.setAttribute("playsinline", ""); v.setAttribute("webkit-playsinline", "");
    var btn = $(".vbtn", v.parentNode);
    var manual = false;
    btn.addEventListener("click", function () { manual = true; if (v.paused) vplay(v); else vpause(v); });
    v.addEventListener("ended", function () { setPlaying(v, false); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { if (v.getAttribute("preload") === "none") v.setAttribute("preload", "metadata"); if (v.dataset.auto === "1" && !reduce && !manual) vplay(v); }
          else if (!v.paused) { vpause(v); manual = false; }
        });
      }, { threshold: 0.45 }).observe(v);
    }
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden) vids.forEach(function (v) { if (!v.paused) vpause(v); }); });

  /* ---------- Vœu ---------- */
  var section = $("#voeu"), candlesEl = $$(".candle"), out = 0, finished = false, holdT = null, cakeWrap = $("#cake-wrap");
  function blow(i) {
    var c = candlesEl[i];
    if (!c || c.classList.contains("out") || finished) return;
    c.classList.add("out"); out++;
    if (out >= candlesEl.length) finish();
  }
  function blowNext() {
    for (var i = 0; i < candlesEl.length; i++) if (!candlesEl[i].classList.contains("out")) { blow(i); return true; }
    return false;
  }
  candlesEl.forEach(function (c, i) {
    c.addEventListener("click", function (e) { e.stopPropagation(); blow(i); });
    c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blow(i); } });
  });
  function startHold() { stopHold(); holdT = setTimeout(function loop() { if (blowNext()) holdT = setTimeout(loop, 700); }, 550); }
  function stopHold() { if (holdT) { clearTimeout(holdT); holdT = null; } }
  cakeWrap.addEventListener("pointerdown", startHold);
  ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { cakeWrap.addEventListener(ev, stopHold); });
  function finish() {
    finished = true;
    setTimeout(function () {
      section.classList.add("done");
      $("#voeu-hint").style.opacity = 0;
      confetti();
    }, reduce ? 0 : 900);
  }
  $("#replay").addEventListener("click", function () {
    candlesEl.forEach(function (c) { c.classList.remove("out"); });
    out = 0; finished = false; section.classList.remove("done"); $("#voeu-hint").style.opacity = 1;
    $$(".rv.in").forEach(function (el) { if (!el.closest("#gate")) el.classList.remove("in"); });
    vids.forEach(function (v) { if (!v.paused) vpause(v); });
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    setTimeout(function () { revealVisible(); }, reduce ? 0 : 700);
  });

  /* Confettis dorés, une seule fois, sobres */
  var confettiDone = false;
  function confetti() {
    if (confettiDone || reduce) return; confettiDone = true;
    var cv = $("#confetti"), ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; }
    size();
    var cols = ["#B99D60", "#D8C28E", "#8E4D48", "#F6F0E6"], ps = [], N = 70;
    for (var i = 0; i < N; i++) ps.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.5, w: 4 + Math.random() * 5, h: 7 + Math.random() * 8, vy: 1.1 + Math.random() * 1.6, vx: (Math.random() - .5) * .7, r: Math.random() * 6.28, vr: (Math.random() - .5) * .07, c: cols[i % cols.length], ph: Math.random() * 6.28 });
    var t0 = performance.now(), D = 4200;
    (function frame(t) {
      var k = t - t0; ctx.clearRect(0, 0, cv.width, cv.height);
      var fade = k > D - 1200 ? Math.max(0, (D - k) / 1200) : 1;
      ps.forEach(function (p) {
        p.y += p.vy; p.x += p.vx + Math.sin(k / 600 + p.ph) * .35; p.r += p.vr;
        ctx.save(); ctx.globalAlpha = .9 * fade; ctx.translate(p.x * dpr, p.y * dpr); ctx.rotate(p.r); ctx.scale(dpr, dpr);
        ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (k < D) requestAnimationFrame(frame); else ctx.clearRect(0, 0, cv.width, cv.height);
    })(t0);
  }

  /* ---------- Tiroir du colophon ---------- */
  var star = $("#star"), drawer = $("#drawer");
  star.addEventListener("click", function () {
    var o = star.getAttribute("aria-expanded") === "true";
    star.setAttribute("aria-expanded", o ? "false" : "true");
    drawer.classList.toggle("open", !o);
  });
})();
