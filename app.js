(function () {
  var start = document.getElementById('start');
  var home = document.getElementById('home');
  var selector = document.getElementById('selector');
  var result = document.getElementById('result');
  var back = document.getElementById('back');
  var homeLink = document.getElementById('home-link');
  var cards = document.querySelectorAll('.card');
  var resultCards = document.querySelectorAll('.result-card');

  function show(el) { if (el) el.hidden = false; }
  function hide(el) { if (el) el.hidden = true; }
  function hideAllResults() {
    for (var i = 0; i < resultCards.length; i++) hide(resultCards[i]);
  }

  start.addEventListener('click', function () {
    hide(home);
    show(selector);
    selector.scrollIntoView({ block: 'start' });
  });

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
      var tier = this.getAttribute('data-tier');
      hide(selector);
      hideAllResults();
      show(document.getElementById('result-' + tier));
      show(result);
      result.scrollIntoView({ block: 'start' });
    });
  }

  back.addEventListener('click', function (e) {
    e.preventDefault();
    hide(result);
    hideAllResults();
    show(selector);
    selector.scrollIntoView({ block: 'start' });
  });

  homeLink.addEventListener('click', function (e) {
    e.preventDefault();
    hide(result);
    hideAllResults();
    hide(selector);
    show(home);
    home.scrollIntoView({ block: 'start' });
  });
})();
