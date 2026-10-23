/* ===== QuizWave — Quiz engine (Phase 2) ===== */
(function () {
  'use strict';
  var SCORES_KEY = 'quizwave_scores';
  var params = new URLSearchParams(window.location.search);
  var topicKey = params.get('topic') || 'siege';
  var quiz = QUIZZES[topicKey];

  if (!quiz) { window.location.replace('home.html'); return; }

  var current = 0;
  var score = 0;
  var answered = false;

  var titleEl = document.getElementById('quiz-title');
  var counterEl = document.getElementById('question-counter');
  var scoreEl = document.getElementById('score-counter');
  var progressFill = document.getElementById('progress-fill');
  var questionEl = document.getElementById('question-text');
  var answersEl = document.getElementById('answers');
  var feedbackEl = document.getElementById('feedback');
  var nextBtn = document.getElementById('next-btn');
  var quizCard = document.getElementById('quiz-card');
  var resultsCard = document.getElementById('results-card');

  titleEl.textContent = quiz.emoji + ' ' + quiz.title;

  function renderQuestion() {
    answered = false;
    var item = quiz.questions[current];
    questionEl.textContent = item.q;
    feedbackEl.hidden = true;
    nextBtn.hidden = true;
    counterEl.textContent = 'Question ' + (current + 1) + ' / ' + quiz.questions.length;
    scoreEl.textContent = 'Score: ' + score;
    progressFill.style.width = ((current / quiz.questions.length) * 100) + '%';

    answersEl.innerHTML = '';
    item.answers.forEach(function (text, i) {
      var btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.type = 'button';
      btn.textContent = text;
      btn.addEventListener('click', function () { select(i, btn); });
      answersEl.appendChild(btn);
    });
  }

  function select(i, btn) {
    if (answered) return;
    answered = true;
    var item = quiz.questions[current];
    var buttons = answersEl.querySelectorAll('.answer-btn');

    if (i === item.correct) {
      score++;
      btn.classList.add('correct');
      feedbackEl.textContent = '✅ Correct! ' + (item.fact || '');
      feedbackEl.className = 'feedback correct';
    } else {
      btn.classList.add('wrong');
      buttons[item.correct].classList.add('correct');
      feedbackEl.textContent = '❌ Nope — the answer was "' + item.answers[item.correct] + '". ' + (item.fact || '');
      feedbackEl.className = 'feedback wrong';
    }
    feedbackEl.hidden = false;
    scoreEl.textContent = 'Score: ' + score;
    nextBtn.hidden = false;
    nextBtn.textContent = current === quiz.questions.length - 1 ? 'See Results' : 'Next Question';
  }

  nextBtn.addEventListener('click', function () {
    current++;
    if (current < quiz.questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    quizCard.hidden = true;
    var total = quiz.questions.length;
    var pct = Math.round((score / total) * 100);

    document.getElementById('results-score').textContent = score + ' / ' + total + ' (' + pct + '%)';
    var emojiEl = document.getElementById('results-emoji');
    var msgEl = document.getElementById('results-message');
    if (pct === 100) { emojiEl.textContent = '🏆'; msgEl.textContent = 'Flawless victory! Absolute legend.'; }
    else if (pct >= 70) { emojiEl.textContent = '🎉'; msgEl.textContent = 'Strong showing — you know your stuff!'; }
    else if (pct >= 40) { emojiEl.textContent = '🙂'; msgEl.textContent = 'Not bad. A little practice and you\'re there.'; }
    else { emojiEl.textContent = '😅'; msgEl.textContent = 'Rough one. Rematch?'; }

    // Save score
    var scores = [];
    try { scores = JSON.parse(localStorage.getItem(SCORES_KEY)) || []; } catch (e) {}
    scores.push({ topic: topicKey, topicName: quiz.title, score: score, total: total, pct: pct, date: new Date().toISOString() });
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));

    resultsCard.hidden = false;
  }

  document.getElementById('retry-btn').addEventListener('click', function () {
    current = 0;
    score = 0;
    resultsCard.hidden = true;
    quizCard.hidden = false;
    renderQuestion();
  });

  renderQuestion();
})();
