import { useState } from 'react';
import { useApp } from '../context/AppContext';

const EMOJIS = ['📚', '✏️', '🛏️', '🦷', '🍽️', '⚽', '🎨', '🎵', '🧹', '🌱', '🐾', '💪', '🧩', '🍎', '🚿'];
const CATEGORIES = ['Chores', 'Learning', 'Hygiene', 'Health', 'Creative', 'Other'];

export default function AddTask() {
  const { state, dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(10);
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch({ type: 'ADD_TASK', payload: { title: title.trim(), points: Number(points), emoji, category } });
  };

  return (
    <div className="form-page">
      <button className="back-btn" onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'home' } })}>
        ← Back
      </button>
      <h2 className="form-title">📋 Add a Task</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label className="form-label">Task Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Clean your room..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="form-label">Points: <strong>{points}</strong></label>
        <input
          className="form-range"
          type="range"
          min="5"
          max="100"
          step="5"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <div className="range-labels"><span>5</span><span>100</span></div>

        <label className="form-label">Pick an Icon</label>
        <div className="avatar-grid">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              className={`avatar-btn ${emoji === e ? 'selected' : ''}`}
              onClick={() => setEmoji(e)}
            >
              {e}
            </button>
          ))}
        </div>

        <label className="form-label">Category</label>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`cat-btn ${category === c ? 'selected' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          ✅ Add Task
        </button>
      </form>

      {state.tasks.length > 0 && (
        <div className="existing-tasks">
          <h3 className="section-title">Existing Tasks</h3>
          {state.tasks.map((task) => (
            <div key={task.id} className="task-item">
              <span className="task-emoji">{task.emoji}</span>
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className="task-cat">{task.category}</span>
              </div>
              <span className="task-pts">+{task.points} pts</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
