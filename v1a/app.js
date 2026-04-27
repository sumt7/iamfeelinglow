(function () {
  var start = document.getElementById('start');
  var home = document.getElementById('home');
  var selector = document.getElementById('selector');
  var result = document.getElementById('result');
  var back = document.getElementById('back');
  var homeLink = document.getElementById('home-link');
  var question = document.querySelector('#selector .question');
  var cards = document.querySelectorAll('.card');
  var resultCards = document.querySelectorAll('.result-card');
  var v2Nudge = document.getElementById('v2-nudge');
  var passItOn = document.getElementById('pass-it-on');
  var passTrigger = document.getElementById('pass-trigger');
  var counterLine = document.getElementById('counter-line');

  var COUNTER_API = '/api/v1a-counter';
  var CLICKED_KEY = 'iamfeelinglow-v1a-start-clicked';
  var COUNTER_THRESHOLD = 50;
  var hasClickedBefore = false;
  try { hasClickedBefore = !!localStorage.getItem(CLICKED_KEY); } catch (e) { /* private mode */ }

  function show(el) { if (el) el.hidden = false; }
  function hide(el) { if (el) el.hidden = true; }
  function hideAllResults() {
    for (var i = 0; i < resultCards.length; i++) hide(resultCards[i]);
  }

  function renderHome() {
    hide(result);
    hideAllResults();
    hide(selector);
    show(home);
    home.scrollIntoView({ block: 'start' });
    if (start && typeof start.focus === 'function') start.focus({ preventScroll: true });
  }

  function renderSelector() {
    hide(home);
    hide(result);
    hideAllResults();
    show(selector);
    selector.scrollIntoView({ block: 'start' });
    if (question && typeof question.focus === 'function') question.focus({ preventScroll: true });
  }

  function renderResult(tier) {
    hide(home);
    hide(selector);
    hideAllResults();
    var card = document.getElementById('result-' + tier);
    if (!card) return;
    show(card);
    if (v2Nudge) {
      if (tier === 'dangerous') hide(v2Nudge); else show(v2Nudge);
    }
    if (passItOn) {
      if (tier === 'dangerous') hide(passItOn); else show(passItOn);
    }
    show(result);
    result.scrollIntoView({ block: 'start' });
    if (typeof card.focus === 'function') card.focus({ preventScroll: true });
  }

  function applyState(state) {
    if (!state || state.view === 'home') { renderHome(); return; }
    if (state.view === 'selector') { renderSelector(); return; }
    if (state.view === 'result' && state.tier) { renderResult(state.tier); return; }
    renderHome();
  }

  function pushView(state) {
    try { history.pushState(state, '', ''); } catch (e) { /* ignore */ }
  }

  function track(name, value) {
    try {
      var body = { name: name };
      if (value) body.value = value;
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(function () { /* silent */ });
    } catch (e) { /* ignore */ }
  }

  start.addEventListener('click', function () {
    track('clicked_start');
    pushView({ view: 'selector' });
    renderSelector();
    if (!hasClickedBefore) {
      hasClickedBefore = true;
      try { localStorage.setItem(CLICKED_KEY, '1'); } catch (e) { /* private mode */ }
      try { fetch(COUNTER_API, { method: 'POST' }).catch(function () {}); } catch (e) { /* ignore */ }
    }
  });

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
      var tier = this.getAttribute('data-tier');
      track('answered_q1', tier);
      track('viewed_result', tier);
      pushView({ view: 'result', tier: tier });
      renderResult(tier);
    });
  }

  var shareRow = document.querySelector('#share-link .share-row');
  if (shareRow) {
    shareRow.addEventListener('click', function (e) {
      var item = e.target && e.target.closest && e.target.closest('.share-item');
      if (!item) return;
      var label = (item.textContent || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (label) track('clicked_share', label);
    });
  }

  back.addEventListener('click', function (e) {
    e.preventDefault();
    history.back();
  });

  homeLink.addEventListener('click', function (e) {
    e.preventDefault();
    pushView({ view: 'home' });
    renderHome();
  });

  window.addEventListener('popstate', function (e) {
    applyState(e.state);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !result.hidden) { history.back(); }
  });

  try { history.replaceState({ view: 'home' }, '', ''); } catch (e) { /* ignore */ }

  // Counter line above Start. Shown to everyone each visit; only the increment is once-per-device.
  if (counterLine) {
    try {
      fetch(COUNTER_API).then(function (r) {
        if (!r.ok) return;
        return r.json();
      }).then(function (data) {
        if (!data || typeof data.count !== 'number') return;
        if (data.count < COUNTER_THRESHOLD) {
          counterLine.textContent = 'Free and live since April 2026.';
        } else {
          counterLine.textContent = data.count + ' have made it this far. You’re next.';
        }
        counterLine.hidden = false;
      }).catch(function () { /* silent */ });
    } catch (e) { /* silent */ }
  }

  var SHARE_URL = 'https://iamfeelinglow.today/';
  var SHARE_TEXT = 'Heavy day?\n\nThis took 60 seconds. No signup, no tracking — it just picks one small thing to try, matched to how heavy the day actually feels.\n\nUse it if you need it. Forward it if you don\'t.\n\n#MentalHealth #Selfcare';
  var shareNative = document.getElementById('share-native');
  var shareCopy = document.getElementById('share-copy');

  if (shareNative && typeof navigator.share === 'function') {
    shareNative.hidden = false;
    shareNative.addEventListener('click', function () {
      try {
        navigator.share({ title: 'I am feeling low', text: SHARE_TEXT, url: SHARE_URL })
          .catch(function () { /* user cancelled */ });
      } catch (e) { /* ignore */ }
    });
  }

  if (shareCopy && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    shareCopy.hidden = false;
    shareCopy.addEventListener('click', function () {
      try {
        navigator.clipboard.writeText(SHARE_URL).then(function () {
          var original = shareCopy.textContent;
          shareCopy.textContent = 'Copied';
          setTimeout(function () { shareCopy.textContent = original; }, 1500);
        }).catch(function () { /* ignore */ });
      } catch (e) { /* ignore */ }
    });
  }

  if (passTrigger) {
    passTrigger.addEventListener('click', function () {
      track('clicked_share', 'pass-it-on');
      if (typeof navigator.share === 'function') {
        try {
          navigator.share({ title: 'I am feeling low', text: SHARE_TEXT, url: SHARE_URL })
            .catch(function () { /* user cancelled */ });
        } catch (e) { /* ignore */ }
        return;
      }
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          navigator.clipboard.writeText(SHARE_URL).then(function () {
            var original = passTrigger.textContent;
            passTrigger.textContent = 'link copied';
            setTimeout(function () { passTrigger.textContent = original; }, 1800);
          }).catch(function () { /* ignore */ });
        } catch (e) { /* ignore */ }
        return;
      }
      var fallback = document.getElementById('share-link');
      if (fallback && typeof fallback.scrollIntoView === 'function') {
        fallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
})();

