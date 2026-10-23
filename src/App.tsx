import React, { useState, useEffect } from 'react';
import { SessionData, UsersMap } from './types';

const USERS_KEY = 'quizwave_users';
const SESSION_KEY = 'quizwave_session';

function getUsers(): UsersMap {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function saveUsers(users: UsersMap) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredSession(): SessionData | null {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (sessionStr) {
      return JSON.parse(sessionStr);
    }
  } catch {
    return null;
  }
  return null;
}

export function App() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign-in form state
  const [signinUsername, setSigninUsername] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [signinError, setSigninError] = useState('');

  // Sign-up form state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupError, setSignupError] = useState('');

  // Active session
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null);

  // Dialog / Modal state (avoids window.alert inside iframe)
  const [dialogInfo, setDialogInfo] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    const session = getStoredSession();
    if (session) {
      setCurrentSession(session);
    }
  }, []);

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    setSigninError('');
    setSignupError('');
  };

  const showNotice = (title: string, message: string) => {
    setDialogInfo({ title, message });
  };

  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSigninError('');

    const username = signinUsername.trim();
    const password = signinPassword;

    if (!username || !password) {
      setSigninError('Please enter both username and password.');
      return;
    }

    const users = getUsers();
    if (!users[username]) {
      setSigninError('No account found with that username.');
      return;
    }

    if (users[username].password !== password) {
      setSigninError('Incorrect password. Try again.');
      return;
    }

    const session: SessionData = {
      username,
      remember: rememberMe,
      signedInAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    if (!rememberMe) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    setCurrentSession(session);
    setSigninPassword('');
    showNotice('Welcome Back!', `Welcome back, ${username}! (Quiz home coming in Phase 2)`);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    const username = signupUsername.trim();
    const password = signupPassword;
    const confirm = signupConfirm;

    if (username.length < 3) {
      setSignupError('Username must be at least 3 characters.');
      return;
    }
    if (password.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setSignupError('Passwords do not match.');
      return;
    }

    const users = getUsers();
    if (users[username]) {
      setSignupError('That username is already taken.');
      return;
    }

    users[username] = {
      password: password,
      createdAt: new Date().toISOString(),
    };
    saveUsers(users);

    showNotice('Account Created', 'Account created! You can sign in now.');
    setActiveTab('signin');
    setSigninUsername(username);
    setSignupUsername('');
    setSignupPassword('');
    setSignupConfirm('');
  };

  const handleGuestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const guestSession: SessionData = {
      username: 'guest',
      guest: true,
      signedInAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(guestSession));
    setCurrentSession(guestSession);
    showNotice('Guest Mode', 'Playing as guest! (Quiz home coming in Phase 2)');
  };

  const handleForgotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showNotice('Password Reset', 'Password reset coming soon.');
  };

  const handleSignOut = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setCurrentSession(null);
    setSigninPassword('');
  };

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="brand">
          <span className="brand-icon" role="img" aria-label="brain">🧠</span>
          <h1>QuizWave</h1>
          <p className="tagline">Test your knowledge. Ride the wave.</p>
        </div>

        {currentSession ? (
          <div className="session-view">
            <div className="session-badge">
              {currentSession.guest ? 'Guest Session' : 'Active Account'}
            </div>
            <h3>
              {currentSession.guest ? 'Welcome, Guest!' : `Welcome back, ${currentSession.username}!`}
            </h3>
            <p className="tagline" style={{ marginTop: '8px' }}>
              Quiz home coming in Phase 2
            </p>

            <div className="session-info">
              <div>
                <span className="label">User:</span>
                <span className="value">{currentSession.username}</span>
              </div>
              <div>
                <span className="label">Type:</span>
                <span className="value">{currentSession.guest ? 'Guest Explorer' : 'Registered Player'}</span>
              </div>
              {currentSession.signedInAt && (
                <div>
                  <span className="label">Session Started:</span>
                  <span className="value">
                    {new Date(currentSession.signedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>

            <button type="button" className="btn-primary" onClick={handleSignOut}>
              Sign Out / Switch Account
            </button>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="tabs" role="tablist">
              <button
                id="tab-signin"
                className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'signin'}
                onClick={() => handleTabChange('signin')}
              >
                Sign In
              </button>
              <button
                id="tab-signup"
                className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'signup'}
                onClick={() => handleTabChange('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Form */}
            {activeTab === 'signin' && (
              <form id="signin-form" className="auth-form" noValidate onSubmit={handleSigninSubmit}>
                <label htmlFor="signin-username">Username</label>
                <input
                  id="signin-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="your_username"
                  required
                  value={signinUsername}
                  onChange={(e) => setSigninUsername(e.target.value)}
                />

                <label htmlFor="signin-password">Password</label>
                <input
                  id="signin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
                />

                <div className="form-options">
                  <label className="remember">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />{' '}
                    Remember me
                  </label>
                  <button type="button" className="forgot" id="forgot-link" onClick={handleForgotClick}>
                    Forgot password?
                  </button>
                </div>

                {signinError && (
                  <p id="signin-error" className="error-msg" role="alert">
                    {signinError}
                  </p>
                )}

                <button type="submit" className="btn-primary">
                  Sign In
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === 'signup' && (
              <form id="signup-form" className="auth-form" noValidate onSubmit={handleSignupSubmit}>
                <label htmlFor="signup-username">Username</label>
                <input
                  id="signup-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="pick a username"
                  required
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                />

                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="min. 6 characters"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />

                <label htmlFor="signup-confirm">Confirm Password</label>
                <input
                  id="signup-confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="repeat password"
                  required
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                />

                {signupError && (
                  <p id="signup-error" className="error-msg" role="alert">
                    {signupError}
                  </p>
                )}

                <button type="submit" className="btn-primary">
                  Create Account
                </button>
              </form>
            )}

            <p className="guest-hint">
              Just exploring?{' '}
              <button type="button" id="guest-link" onClick={handleGuestClick}>
                Continue as guest
              </button>
            </p>
          </>
        )}

        {/* Modal notification (replacing disruptive/blocked window.alert) */}
        {dialogInfo && (
          <div className="modal-overlay" onClick={() => setDialogInfo(null)} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{dialogInfo.title}</h3>
              <p>{dialogInfo.message}</p>
              <button
                type="button"
                className="modal-close"
                onClick={() => setDialogInfo(null)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
