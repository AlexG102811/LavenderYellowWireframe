/* ===== QuizWave — Demo auth (localStorage) =====
 * Front-end only. Users stored in localStorage for demo purposes.
 * NOTE: never store real passwords like this in production.
 */
(function () {
  'use strict';

  var USERS_KEY = 'quizwave_users';
  var SESSION_KEY = 'quizwave_session';

  var tabSignin = document.getElementById('tab-signin');
  var tabSignup = document.getElementById('tab-signup');
  var signinForm = document.getElementById('signin-form');
  var signupForm = document.getElementById('signup-form');
  var signinError = document.getElementById('signin-error');
  var signupError = document.getElementById('signup-error');

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
  function showError(el, msg) { el.textContent = msg; el.hidden = false; }
  function hideError(el) { el.textContent = ''; el.hidden = true; }
  function setSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    if (!session.remember) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function switchTab(tab) {
    var isSignin = tab === tabSignin;
    tabSignin.classList.toggle('active', isSignin);
    tabSignup.classList.toggle('active', !isSignin);
    tabSignin.setAttribute('aria-selected', String(isSignin));
    tabSignup.setAttribute('aria-selected', String(!isSignin));
    signinForm.hidden = !isSignin;
    signupForm.hidden = isSignin;
    hideError(signinError);
    hideError(signupError);
  }

  tabSignin.addEventListener('click', function () { switchTab(tabSignin); });
  tabSignup.addEventListener('click', function () { switchTab(tabSignup); });

  // Sign up
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    hideError(signupError);
    var username = document.getElementById('signup-username').value.trim();
    var password = document.getElementById('signup-password').value;
    var confirm = document.getElementById('signup-confirm').value;

    if (username.length < 3) return showError(signupError, 'Username must be at least 3 characters.');
    if (password.length < 6) return showError(signupError, 'Password must be at least 6 characters.');
    if (password !== confirm) return showError(signupError, 'Passwords do not match.');

    var users = getUsers();
    if (users[username]) return showError(signupError, 'That username is already taken.');

    users[username] = { password: password, createdAt: new Date().toISOString() };
    saveUsers(users);
    setSession({ username: username, remember: true, signedInAt: new Date().toISOString() });
    signupForm.reset();
    window.location.href = 'home.html';
  });

  // Sign in
  signinForm.addEventListener('submit', function (e) {
    e.preventDefault();
    hideError(signinError);
    var username = document.getElementById('signin-username').value.trim();
    var password = document.getElementById('signin-password').value;

    var users = getUsers();
    if (!users[username]) return showError(signinError, 'No account found with that username.');
    if (users[username].password !== password) return showError(signinError, 'Incorrect password. Try again.');

    setSession({
      username: username,
      remember: document.getElementById('remember-me').checked,
      signedInAt: new Date().toISOString()
    });
    signinForm.reset();
    window.location.href = 'home.html';
  });

  // Guest mode
  document.getElementById('guest-link').addEventListener('click', function (e) {
    e.preventDefault();
    setSession({ username: 'guest', guest: true });
    window.location.href = 'home.html';
  });

  document.getElementById('forgot-link').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Password reset coming soon.');
  });
})();
