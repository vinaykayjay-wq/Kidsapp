import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const LEVELS = [
  { level: 1, name: 'Starter', min: 0, max: 99, emoji: '🌱' },
  { level: 2, name: 'Explorer', min: 100, max: 249, emoji: '🔍' },
  { level: 3, name: 'Adventurer', min: 250, max: 499, emoji: '⚡' },
  { level: 4, name: 'Champion', min: 500, max: 999, emoji: '🏆' },
  { level: 5, name: 'Legend', min: 1000, max: Infinity, emoji: '🌟' },
];

export const BADGES = [
  { id: 'first_task', name: 'First Step', desc: 'Complete your first task', emoji: '👣', check: (kid) => kid.completedTasks >= 1 },
  { id: 'five_tasks', name: 'Go-Getter', desc: 'Complete 5 tasks', emoji: '🚀', check: (kid) => kid.completedTasks >= 5 },
  { id: 'ten_tasks', name: 'Hustler', desc: 'Complete 10 tasks', emoji: '💪', check: (kid) => kid.completedTasks >= 10 },
  { id: 'hundred_points', name: 'Centurion', desc: 'Earn 100 points', emoji: '💯', check: (kid) => kid.points >= 100 },
  { id: 'five_hundred_points', name: 'High Roller', desc: 'Earn 500 points', emoji: '🎰', check: (kid) => kid.points >= 500 },
  { id: 'streak_3', name: 'On Fire', desc: '3-day streak', emoji: '🔥', check: (kid) => kid.streak >= 3 },
];

export const getLevel = (points) =>
  LEVELS.find((l) => points >= l.min && points <= l.max) || LEVELS[0];

export const getBadges = (kid) =>
  BADGES.filter((b) => b.check(kid));

export const getLevelProgress = (points) => {
  const level = getLevel(points);
  if (level.max === Infinity) return 100;
  const range = level.max - level.min + 1;
  return Math.floor(((points - level.min) / range) * 100);
};

const initialState = {
  kids: [],
  tasks: [
    { id: 1, title: 'Make your bed', points: 10, emoji: '🛏️', category: 'Chores' },
    { id: 2, title: 'Brush teeth', points: 5, emoji: '🦷', category: 'Hygiene' },
    { id: 3, title: 'Read for 20 min', points: 20, emoji: '📚', category: 'Learning' },
    { id: 4, title: 'Do homework', points: 25, emoji: '✏️', category: 'Learning' },
    { id: 5, title: 'Help with dishes', points: 15, emoji: '🍽️', category: 'Chores' },
    { id: 6, title: 'Exercise / Play outside', points: 20, emoji: '⚽', category: 'Health' },
  ],
  view: 'home', // home | kid | addKid | addTask | leaderboard
  selectedKid: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_KID': {
      const newKid = {
        id: Date.now(),
        name: action.payload.name,
        avatar: action.payload.avatar,
        color: action.payload.color,
        points: 0,
        completedTasks: 0,
        streak: 0,
        lastActive: null,
        history: [],
      };
      return { ...state, kids: [...state.kids, newKid], view: 'home' };
    }
    case 'ADD_TASK': {
      const newTask = { id: Date.now(), ...action.payload };
      return { ...state, tasks: [...state.tasks, newTask], view: 'home' };
    }
    case 'AWARD_POINTS': {
      const { kidId, task } = action.payload;
      const today = new Date().toDateString();
      return {
        ...state,
        kids: state.kids.map((k) => {
          if (k.id !== kidId) return k;
          const newStreak = k.lastActive === today ? k.streak : k.lastActive === new Date(Date.now() - 86400000).toDateString() ? k.streak + 1 : 1;
          return {
            ...k,
            points: k.points + task.points,
            completedTasks: k.completedTasks + 1,
            streak: newStreak,
            lastActive: today,
            history: [{ taskTitle: task.title, points: task.points, date: today }, ...k.history].slice(0, 20),
          };
        }),
      };
    }
    case 'DELETE_KID':
      return { ...state, kids: state.kids.filter((k) => k.id !== action.payload), view: 'home', selectedKid: null };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case 'SET_VIEW':
      return { ...state, view: action.payload.view, selectedKid: action.payload.kidId ?? state.selectedKid };
    case 'LOAD':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('kidsapp');
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem('kidsapp', JSON.stringify({ kids: state.kids, tasks: state.tasks }));
  }, [state.kids, state.tasks]);

  return <AppContext.Provider value={{ state, dispatch, BADGES, LEVELS }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
