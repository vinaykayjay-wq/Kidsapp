import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="header">
      <div className="header-inner">
        <div
          className="logo"
          onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'home' } })}
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-emoji">⭐</span>
          <span className="logo-text">KidQuest</span>
        </div>
        <nav className="nav">
          <button
            className={`nav-btn ${state.view === 'home' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'home' } })}
          >
            🏠 Home
          </button>
          <button
            className={`nav-btn ${state.view === 'leaderboard' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'leaderboard' } })}
          >
            🏆 Board
          </button>
          <button
            className={`nav-btn ${state.view === 'addKid' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'addKid' } })}
          >
            ➕ Kid
          </button>
          <button
            className={`nav-btn ${state.view === 'addTask' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'addTask' } })}
          >
            📋 Task
          </button>
        </nav>
      </div>
    </header>
  );
}
