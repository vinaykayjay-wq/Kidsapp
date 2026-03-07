import { useApp, getLevel } from '../context/AppContext';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const { state, dispatch } = useApp();
  const sorted = [...state.kids].sort((a, b) => b.points - a.points);

  if (sorted.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-emoji">🏆</div>
        <h2>No kids yet!</h2>
        <p>Add kids and complete tasks to see rankings</p>
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'addKid' } })}>
          ➕ Add Kid
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2 className="section-title">🏆 Leaderboard</h2>

      {/* Top 3 podium */}
      {sorted.length >= 1 && (
        <div className="podium">
          {sorted.slice(0, 3).map((kid, i) => {
            const level = getLevel(kid.points);
            return (
              <div
                key={kid.id}
                className={`podium-spot podium-${i + 1}`}
                onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'kid', kidId: kid.id } })}
                style={{ '--kid-color': kid.color, cursor: 'pointer' }}
              >
                <div className="podium-medal">{MEDALS[i] || ''}</div>
                <div className="podium-avatar">{kid.avatar}</div>
                <div className="podium-name">{kid.name}</div>
                <div className="podium-pts">⭐ {kid.points}</div>
                <div className="podium-level">{level.emoji} Lv {level.level}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full list */}
      <div className="lb-list">
        {sorted.map((kid, i) => {
          const level = getLevel(kid.points);
          return (
            <div
              key={kid.id}
              className="lb-item"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'kid', kidId: kid.id } })}
              style={{ cursor: 'pointer' }}
            >
              <span className="lb-rank">{MEDALS[i] || `#${i + 1}`}</span>
              <span className="lb-avatar">{kid.avatar}</span>
              <div className="lb-info">
                <span className="lb-name">{kid.name}</span>
                <span className="lb-level">{level.emoji} {level.name}</span>
              </div>
              <div className="lb-right">
                <span className="lb-pts">⭐ {kid.points}</span>
                <span className="lb-tasks">✅ {kid.completedTasks} tasks</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
