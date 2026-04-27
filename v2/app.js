(function () {
  var begin = document.getElementById('begin');
  var intro = document.getElementById('intro');
  var q1 = document.getElementById('q1');
  var q2 = document.getElementById('q2');
  var q3 = document.getElementById('q3');
  var q4 = document.getElementById('q4');
  var result = document.getElementById('result');
  var resultCards = document.querySelectorAll('.result-card');
  var allCards = document.querySelectorAll('.card');
  var q3Continue = document.getElementById('q3-continue');
  var restart = document.getElementById('restart');

  var answers = { q1: 0, q2: 0, q3: 0, q4: 0 };
  var q3Selected = {};

  var passItOn = document.getElementById('pass-it-on');
  var passTrigger = document.getElementById('pass-trigger');

  // v2's classify() returns tier names (flat/heavy/drowning/dangerous);
  // analytics carry "band" instead, per the schema Sumeet asked for.
  var BAND_MAP = {
    flat: 'mild',
    heavy: 'moderate',
    drowning: 'severe',
    dangerous: 'crisis',
  };

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

  function show(el) { if (el) el.hidden = false; }
  function hide(el) { if (el) el.hidden = true; }
  function hideAll() { hide(intro); hide(q1); hide(q2); hide(q3); hide(q4); hide(result); }
  function hideAllResults() { for (var i = 0; i < resultCards.length; i++) hide(resultCards[i]); }
  function scrollTop() { window.scrollTo({ top: 0, behavior: 'auto' }); }

  function classify() {
    if (answers.q4 === 1) return 'dangerous';
    var total = answers.q1 + answers.q2 + answers.q3;
    if (total >= 8) return 'dangerous';
    if (total >= 6) return 'drowning';
    if (total >= 4) return 'heavy';
    return 'flat';
  }

  function reset() {
    answers = { q1: 0, q2: 0, q3: 0, q4: 0 };
    q3Selected = {};
    var sel = document.querySelectorAll('.card.selected');
    for (var i = 0; i < sel.length; i++) sel[i].classList.remove('selected');
    hideAllResults();
    hideAll();
    show(intro);
    scrollTop();
  }

  begin.addEventListener('click', function () {
    track('clicked_start');
    hideAll(); show(q1); scrollTop();
  });

  for (var i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', function () {
      var qNum = this.getAttribute('data-q');
      var val = parseInt(this.getAttribute('data-val'), 10);

      if (qNum === '1') {
        answers.q1 = val;
        track('answered_q1', String(val));
        hideAll(); show(q2); scrollTop();
      } else if (qNum === '2') {
        answers.q2 = val;
        track('answered_q2', String(val));
        hideAll(); show(q3); scrollTop();
      } else if (qNum === '3') {
        if (this.classList.contains('selected')) {
          this.classList.remove('selected');
          delete q3Selected[val];
        } else {
          this.classList.add('selected');
          q3Selected[val] = true;
        }
      } else if (qNum === '4') {
        answers.q4 = val;
        track('answered_q4', String(val));
        var maxQ3 = 0;
        for (var k in q3Selected) {
          if (q3Selected[k] && parseInt(k, 10) > maxQ3) maxQ3 = parseInt(k, 10);
        }
        answers.q3 = maxQ3;
        var tier = classify();
        track('viewed_result', BAND_MAP[tier] || tier);
        hideAll();
        hideAllResults();
        show(document.getElementById('result-' + tier));
        if (passItOn) {
          if (tier === 'dangerous') hide(passItOn); else show(passItOn);
        }
        show(result);
        scrollTop();
      }
    });
  }

  q3Continue.addEventListener('click', function () {
    var maxQ3 = 0;
    for (var k in q3Selected) {
      if (q3Selected[k] && parseInt(k, 10) > maxQ3) maxQ3 = parseInt(k, 10);
    }
    answers.q3 = maxQ3;
    track('answered_q3', String(maxQ3));
    hideAll(); show(q4); scrollTop();
  });

  restart.addEventListener('click', function (e) {
    e.preventDefault();
    reset();
  });

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

  var shareRow = document.querySelector('#share-link .share-row');
  if (shareRow) {
    shareRow.addEventListener('click', function (e) {
      var item = e.target && e.target.closest && e.target.closest('.share-item');
      if (!item) return;
      var label = (item.textContent || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (label) track('clicked_share', label);
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
