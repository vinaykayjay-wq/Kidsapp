import { useState } from 'react';
import { useApp, getLevel, getLevelProgress, getBadges, BADGES } from '../context/AppContext';

export default function KidProfile() {
  const { state, dispatch } = useApp();
  const [awarded, setAwarded] = useState(null);

  const kid = state.kids.find((k) => k.id === state.selectedKid);
  if (!kid) return null;

  const level = getLevel(kid.points);
  const progress = getLevelProgress(kid.points);
  const earnedBadges = getBadges(kid);
  const earnedIds = new Set(earnedBadges.map((b) => b.id));

  const handleAward = (task) => {
    dispatch({ type: 'AWARD_POINTS', payload: { kidId: kid.id, task } });
    setAwarded(task.id);
    setTimeout(() => setAwarded(null), 1500);
  };

  const nextLevel = (() => {
    const lvl = getLevel(kid.points);
    const found = [100, 250, 500, 1000, Infinity];
    const next = found.find((n) => n > kid.points);
    return next === Infinity ? null : next - kid.points;
  })();

  return (
    <div className="kid-profile">
      <button
        className="back-btn"
        onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'home' } })}
      >
        ← Back
      </button>

      {/* Hero */}
      <div className="profile-hero" style={{ '--kid-color': kid.color }}>
        <div className="profile-avatar">{kid.avatar}</div>
        <h2 className="profile-name">{kid.name}</h2>
        <div className="profile-level">{level.emoji} {level.name} · Level {level.level}</div>
        <div className="profile-points">⭐ {kid.points} points</div>
        <div className="progress-bar wide">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {nextLevel && <p className="next-level">{nextLevel} pts to next level</p>}
        <div className="profile-stats">
          <div className="stat"><span className="stat-val">✅ {kid.completedTasks}</span><span className="stat-lbl">Tasks Done</span></div>
          <div className="stat"><span className="stat-val">🔥 {kid.streak}</span><span className="stat-lbl">Day Streak</span></div>
        </div>
      </div>

      {/* Tasks */}
      <section className="section">
        <h3 className="section-title">📋 Available Tasks</h3>
        <div className="task-list">
          {state.tasks.map((task) => (
            <div key={task.id} className={`task-item ${awarded === task.id ? 'task-awarded' : ''}`}>
              <span className="task-emoji">{task.emoji}</span>
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className="task-cat">{task.category}</span>
              </div>
              <span className="task-pts">+{task.points} pts</span>
              <button
                className={`btn btn-award ${awarded === task.id ? 'awarded' : ''}`}
                onClick={() => handleAward(task)}
              >
                {awarded === task.id ? '🎉' : '✔'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="section">
        <h3 className="section-title">🏅 Badges</h3>
        <div className="badges-grid">
          {BADGES.map((badge) => {
            const earned = earnedIds.has(badge.id);
            return (
              <div key={badge.id} className={`badge-item ${earned ? 'earned' : 'locked'}`}>
                <span className="badge-emoji">{earned ? badge.emoji : '🔒'}</span>
                <span className="badge-name">{badge.name}</span>
                <span className="badge-desc">{badge.desc}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* History */}
      {kid.history.length > 0 && (
        <section className="section">
          <h3 className="section-title">📜 Recent Activity</h3>
          <div className="history-list">
            {kid.history.map((h, i) => (
              <div key={i} className="history-item">
                <span>{h.taskTitle}</span>
                <span className="history-pts">+{h.points} pts</span>
                <span className="history-date">{h.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <button
        className="btn btn-danger"
        onClick={() => {
          if (confirm(`Remove ${kid.name}?`)) dispatch({ type: 'DELETE_KID', payload: kid.id });
        }}
      >
        🗑 Remove {kid.name}
      </button>
    </div>
  );
}
