import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Home from './components/Home';
import KidProfile from './components/KidProfile';
import AddKid from './components/AddKid';
import AddTask from './components/AddTask';
import Leaderboard from './components/Leaderboard';
import './App.css';

function AppContent() {
  const { state } = useApp();

  const views = {
    home: <Home />,
    kid: <KidProfile />,
    addKid: <AddKid />,
    addTask: <AddTask />,
    leaderboard: <Leaderboard />,
  };

  return (
    <div className="app">
      <Header />
      <main className="main">{views[state.view] ?? <Home />}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
