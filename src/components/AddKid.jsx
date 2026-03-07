import { useState } from 'react';
import { useApp } from '../context/AppContext';

const AVATARS = ['🧒', '👦', '👧', '🧑', '👩', '🦊', '🐼', '🦁', '🐸', '🐯', '🦄', '🐉', '🦅', '🐬', '🌟'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#FFB347', '#87CEEB'];

export default function AddKid() {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: 'ADD_KID', payload: { name: name.trim(), avatar, color } });
  };

  return (
    <div className="form-page">
      <button className="back-btn" onClick={() => dispatch({ type: 'SET_VIEW', payload: { view: 'home' } })}>
        ← Back
      </button>
      <h2 className="form-title">➕ Add a Kid</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter kid's name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="form-label">Pick an Avatar</label>
        <div className="avatar-grid">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              className={`avatar-btn ${avatar === a ? 'selected' : ''}`}
              onClick={() => setAvatar(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <label className="form-label">Pick a Color</label>
        <div className="color-grid">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-btn ${color === c ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <div className="preview-card" style={{ '--kid-color': color }}>
          <span className="preview-avatar">{avatar}</span>
          <span className="preview-name">{name || 'Preview'}</span>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          🎉 Add Kid
        </button>
      </form>
    </div>
  );
}
