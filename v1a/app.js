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

  start.addEventListener('click', function () {
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
      pushView({ view: 'result', tier: tier });
      renderResult(tier);
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

  // Counter line above Start. Skips repeat visitors and silent-fails on API errors.
  if (counterLine && !hasClickedBefore) {
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
})();

