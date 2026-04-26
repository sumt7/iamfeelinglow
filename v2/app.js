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
    hideAll(); show(q1); scrollTop();
  });

  for (var i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', function () {
      var qNum = this.getAttribute('data-q');
      var val = parseInt(this.getAttribute('data-val'), 10);

      if (qNum === '1') {
        answers.q1 = val;
        hideAll(); show(q2); scrollTop();
      } else if (qNum === '2') {
        answers.q2 = val;
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
        var maxQ3 = 0;
        for (var k in q3Selected) {
          if (q3Selected[k] && parseInt(k, 10) > maxQ3) maxQ3 = parseInt(k, 10);
        }
        answers.q3 = maxQ3;
        var tier = classify();
        hideAll();
        hideAllResults();
        show(document.getElementById('result-' + tier));
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
    hideAll(); show(q4); scrollTop();
  });

  restart.addEventListener('click', function (e) {
    e.preventDefault();
    reset();
  });
})();
