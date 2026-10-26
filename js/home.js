/* ===== QuizWave — Home page logic (Phase 3: leaderboards) ===== */
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
    window.location.replace('index.html');
    return;
  }

  document.getElementById('signout-link').addEventListener('click', function () {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  });

  var scores = [];
  try { scores = JSON.parse(localStorage.getItem(SCORES_KEY)) || []; } catch (e) {}

  // --- Recent scores ---
  var scoreboard = document.getElementById('scoreboard');
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

  // --- Leaderboard (best score per quiz) ---
  var board = document.getElementById('leaderboard');
  var bests = {};
  scores.forEach(function (s) {
    if (!bests[s.topic] || s.pct > bests[s.topic].pct) bests[s.topic] = s;
  });

  var bestList = Object.keys(bests).map(function (k) { return bests[k]; })
    .sort(function (a, b) { return b.pct - a.pct; });

  if (bestList.length) {
    document.getElementById('no-leaderboard').hidden = true;
    bestList.forEach(function (s, i) {
      var rank = i + 1;
      var medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
      var row = document.createElement('div');
      row.className = 'leader-row';
      row.innerHTML =
        '<span class="leader-rank">' + medal + '</span>' +
        '<span class="leader-topic">' + (s.topic === 'siege' ? '🔫' : '⚾') + ' ' + s.topicName + '</span>' +
        '<span class="leader-score">' + s.score + '/' + s.total + ' (' + s.pct + '%)</span>' +
        '<span class="leader-date">' + new Date(s.date).toLocaleDateString() + '</span>';
      board.appendChild(row);
    });
  }
})();
