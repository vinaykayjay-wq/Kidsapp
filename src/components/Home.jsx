import { useApp, getLevel, getLevelProgress } from '../context/AppContext';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

export default function Home() {
  const { state, dispatch } = useApp();
  const sorted = [...state.kids].sort((a, b) => b.points - a.points);

  if (state.kids.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-emoji">🎮</div>
        <h2>Welcome to KidQuest!</h2>
        <p>Add a kid to get started on their adventure</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'addKid' } })}
        >
          ➕ Add First Kid
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      <h2 className="section-title">👦 Kids</h2>
      <div className="kids-grid">
        {sorted.map((kid) => {
          const level = getLevel(kid.points);
          const progress = getLevelProgress(kid.points);
          return (
            <div
              key={kid.id}
              className="kid-card"
              style={{ '--kid-color': kid.color || COLORS[0] }}
              onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'kid', kidId: kid.id } })}
            >
              <div className="kid-avatar">{kid.avatar}</div>
              <h3 className="kid-name">{kid.name}</h3>
              <div className="kid-level">
                {level.emoji} {level.name} · Lv {level.level}
              </div>
              <div className="kid-points">
                <span className="points-big">⭐ {kid.points}</span>
                <span className="points-label">points</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="kid-stats">
                <span>✅ {kid.completedTasks}</span>
                <span>🔥 {kid.streak}d</span>
              </div>
            </div>
          );
        })}
        <div
          className="kid-card add-card"
          onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'addKid' } })}
        >
          <div className="add-icon">➕</div>
          <p>Add Kid</p>
        </div>
      </div>
    </div>
  );
}
