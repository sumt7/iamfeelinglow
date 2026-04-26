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

  var SHARE_URL = 'https://iamfeelinglow.today/';
  var SHARE_TEXT = 'I am feeling low — a free anonymous tool that matches one honest action to how heavy it actually feels. No signup. No tracking.';
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
})();
