import { useState, useEffect } from 'react';
import { apiCall } from '../api/config';
import { API_ENDPOINTS } from '../api/endpoints';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // API endpoint: /api/leaderboard/
  const leaderboardEndpoint = API_ENDPOINTS.leaderboard;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch leaderboard from /api/leaderboard/ endpoint
        const data = await apiCall(API_ENDPOINTS.leaderboard);
        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center p-5"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Total Activities</th>
            <th>Duration (min)</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry._id}>
              <td>
                <strong>#{entry.rank}</strong>
              </td>
              <td>{entry.userId?.username || 'Unknown'}</td>
              <td>{entry.teamId?.name || 'N/A'}</td>
              <td>{entry.totalActivities}</td>
              <td>{entry.totalDuration}</td>
              <td>{entry.totalDistance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {leaderboard.length === 0 && <p className="text-muted">No leaderboard entries found</p>}
    </div>
  );
}
