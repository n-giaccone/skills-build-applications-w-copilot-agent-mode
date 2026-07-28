import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users } from './components/Users';
import { Teams } from './components/Teams';
import { Activities } from './components/Activities';
import { Leaderboard } from './components/Leaderboard';
import { Workouts } from './components/Workouts';
import { apiConfig } from './api/config';
import './App.css';

function Home() {
  return (
    <div className="container mt-5">
      <div className="alert alert-info">
        <h4>OctoFit Tracker</h4>
        <p>Environment: <strong>{apiConfig.environment}</strong></p>
        <p>API Base URL: <strong>{apiConfig.baseUrl}</strong></p>
        {!apiConfig.isCodespaces && (
          <p className="text-muted">
            💡 Running locally. To use Codespaces, set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>
          </p>
        )}
      </div>
      <h1>Welcome to OctoFit Tracker</h1>
      <p>Select a section from the navigation above to get started.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  );
}

export default App;
