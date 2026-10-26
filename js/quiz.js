/* ===== QuizWave — Quiz engine (Phase 3: timer + shuffle + leaderboards) ===== */
(function () {
  'use strict';
  var SCORES_KEY = 'quizwave_scores';
  var QUESTION_SECONDS = 20; // seconds per question

  var params = new URLSearchParams(window.location.search);
  var topicKey = params.get('topic') || 'siege';
  var quiz = QUIZZES[topicKey];
  if (!quiz) { window.location.replace('home.html'); return; }

  var current = 0;
  var score = 0;
  var answered = false;
  var timerId = null;
  var timeLeft = QUESTION_SECONDS;
  var questions = []; // shuffled copy

  var titleEl = document.getElementById('quiz-title');
  var counterEl = document.getElementById('question-counter');
  var scoreEl = document.getElementById('score-counter');
  var progressFill = document.getElementById('progress-fill');
  var timerTextEl = document.getElementById('timer-text');
  var timerFillEl = document.getElementById('timer-fill');
  var questionEl = document.getElementById('question-text');
  var answersEl = document.getElementById('answers');
  var feedbackEl = document.getElementById('feedback');
  var nextBtn = document.getElementById('next-btn');
  var quizCard = document.getElementById('quiz-card');
  var resultsCard = document.getElementById('results-card');

  titleEl.textContent = quiz.emoji + ' ' + quiz.title;

  // --- Shuffle helpers (Fisher-Yates) ---
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // Shuffle questions once per play-through, and shuffle answer order per question
  function buildRound() {
    questions = shuffle(quiz.questions).map(function (item) {
      var idx = shuffle(item.answers.map(function (_, i) { return i; }));
      return {
        q: item.q,
        fact: item.fact,
        answers: idx.map(function (i) { return item.answers[i]; }),
        correct: idx.indexOf(item.correct)
      };
    });
  }

  // --- Timer ---
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }
  function startTimer() {
    stopTimer();
    timeLeft = QUESTION_SECONDS;
    timerTextEl.textContent = '⏱ ' + timeLeft + 's';
    timerFillEl.style.width = '100%';
    timerTextEl.classList.remove('timer-low');
    timerId = setInterval(function () {
      timeLeft--;
      timerTextEl.textContent = '⏱ ' + timeLeft + 's';
      timerFillEl.style.width = ((timeLeft / QUESTION_SECONDS) * 100) + '%';
      if (timeLeft <= 5) timerTextEl.classList.add('timer-low');
      if (timeLeft <= 0) {
        stopTimer();
        timeUp();
      }
    }, 1000);
  }

  function timeUp() {
    if (answered) return;
    answered = true;
    var item = questions[current];
    var buttons = answersEl.querySelectorAll('.answer-btn');
    buttons.forEach(function (b) { b.disabled = true; });
    buttons[item.correct].classList.add('correct');
    feedbackEl.textContent = '⏰ Time\'s up! The answer was "' + item.answers[item.correct] + '".';
    feedbackEl.className = 'feedback wrong';
    feedbackEl.hidden = false;
    showNextButton();
  }

  // --- Rendering ---
  function renderQuestion() {
    answered = false;
    var item = questions[current];
    questionEl.textContent = item.q;
    feedbackEl.hidden = true;
    nextBtn.hidden = true;
    counterEl.textContent = 'Question ' + (current + 1) + ' / ' + questions.length;
    scoreEl.textContent = 'Score: ' + score;
    progressFill.style.width = ((current / questions.length) * 100) + '%';

    answersEl.innerHTML = '';
    item.answers.forEach(function (text, i) {
      var btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.type = 'button';
      btn.textContent = text;
      btn.addEventListener('click', function () { select(i, btn); });
      answersEl.appendChild(btn);
    });

    startTimer();
  }

  function showNextButton() {
    nextBtn.hidden = false;
    nextBtn.textContent = current === questions.length - 1 ? 'See Results' : 'Next Question';
  }

  function select(i, btn) {
    if (answered) return;
    stopTimer();
    answered = true;
    var item = questions[current];
    var buttons = answersEl.querySelectorAll('.answer-btn');
    buttons.forEach(function (b) { b.disabled = true; });

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
    showNextButton();
  }

  nextBtn.addEventListener('click', function () {
    current++;
    if (current < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    quizCard.hidden = true;
    var total = questions.length;
    var pct = Math.round((score / total) * 100);

    document.getElementById('results-score').textContent = score + ' / ' + total + ' (' + pct + '%)';
    var emojiEl = document.getElementById('results-emoji');
    var msgEl = document.getElementById('results-message');
    if (pct === 100) { emojiEl.textContent = '🏆'; msgEl.textContent = 'Flawless victory! Absolute legend.'; }
    else if (pct >= 70) { emojiEl.textContent = '🎉'; msgEl.textContent = 'Strong showing — you know your stuff!'; }
    else if (pct >= 40) { emojiEl.textContent = '🙂'; msgEl.textContent = 'Not bad. A little practice and you\'re there.'; }
    else { emojiEl.textContent = '😅'; msgEl.textContent = 'Rough one. Rematch?'; }

    // Save score for leaderboard
    var scores = [];
    try { scores = JSON.parse(localStorage.getItem(SCORES_KEY)) || []; } catch (e) {}
    scores.push({ topic: topicKey, topicName: quiz.title, score: score, total: total, pct: pct, date: new Date().toISOString() });
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));

    var bestEl = document.getElementById('results-best');
    var bests = bestScores(scores);
    if (bests[topicKey] && bests[topicKey].pct === pct && pct > 0) {
      bestEl.textContent = '⭐ New personal best for ' + quiz.title + '!';
      bestEl.hidden = false;
    } else {
      bestEl.hidden = true;
    }

    resultsCard.hidden = false;
  }

  function bestScores(scores) {
    var bests = {};
    scores.forEach(function (s) {
      if (!bests[s.topic] || s.pct > bests[s.topic].pct) bests[s.topic] = s;
    });
    return bests;
  }

  document.getElementById('retry-btn').addEventListener('click', function () {
    current = 0;
    score = 0;
    buildRound(); // fresh shuffle on replay
    resultsCard.hidden = true;
    quizCard.hidden = false;
    renderQuestion();
  });

  buildRound();
  renderQuestion();
})();
