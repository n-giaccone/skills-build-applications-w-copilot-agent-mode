import { useState, useEffect } from 'react';
import { apiCall } from '../api/config';

// API endpoint for workouts
const WORKOUTS_ENDPOINT = '/api/workouts/';

export function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await apiCall(WORKOUTS_ENDPOINT);
        setWorkouts(data.workouts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="text-center p-5"><p>Loading workouts...</p></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Workout Suggestions</h1>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <ul className="list-unstyled">
                  <li><strong>Type:</strong> <span className="text-capitalize">{workout.type}</span></li>
                  <li><strong>Duration:</strong> {workout.duration} min</li>
                  <li><strong>Difficulty:</strong> <span className="badge bg-info text-capitalize">{workout.difficulty}</span></li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p className="text-muted">No workouts found</p>}
    </div>
  );
}
