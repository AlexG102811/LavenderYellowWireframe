/* ===== QuizWave — Home page logic ===== */
(function () {
  'use strict';
  var SESSION_KEY = 'quizwave_session';
  var SCORES_KEY = 'quizwave_scores';

  var session = null;
  try { session = JSON.parse(localStorage.getItem(SESSION_KEY)) || JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) {}

  var welcome = document.getElementById('welcome-user');
  if (session && session.username) {
    welcome.textContent = 'Hi, ' + session.username + '!';
  } else {
    // Not signed in — send back to sign-in
    window.location.replace('index.html');
    return;
  }

  document.getElementById('signout-link').addEventListener('click', function () {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  });

  // Recent scores
  var scoreboard = document.getElementById('scoreboard');
  var scores = [];
  try { scores = JSON.parse(localStorage.getItem(SCORES_KEY)) || []; } catch (e) {}

  if (scores.length) {
    document.getElementById('no-scores').hidden = true;
    scores.slice(-5).reverse().forEach(function (s) {
      var item = document.createElement('div');
      item.className = 'score-item';
      var emoji = s.topic === 'siege' ? '🔫' : '⚾';
      item.innerHTML = '<span class="score-topic">' + emoji + ' ' + s.topicName + '</span>' +
        '<span class="score-value">' + s.score + '/' + s.total + ' (' + s.pct + '%)</span>' +
        '<span class="score-date">' + new Date(s.date).toLocaleDateString() + '</span>';
      scoreboard.appendChild(item);
    });
  }
})();
