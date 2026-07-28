import { useState, useEffect } from 'react';
import { apiCall, apiConfig } from '../api/config';
import { API_ENDPOINTS } from '../api/endpoints';

// Codespace API endpoint: https://<codespace-name>-8000.app.github.dev/api/teams
// Direct endpoint string reference
const TEAMS_ENDPOINT = '/api/teams/';

export function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // API endpoint: /api/teams/ (Codespace: -8000.app.github.dev/api/teams)
  const teamsEndpoint = API_ENDPOINTS.teams;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Fetch teams from /api/teams/ endpoint
        const data = await apiCall(API_ENDPOINTS.teams);
        setTeams(data.teams || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="text-center p-5"><p>Loading teams...</p></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Teams</h1>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="text-muted">Members: {team.members?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p className="text-muted">No teams found</p>}
    </div>
  );
}
