import { useState, useEffect } from 'react';
import { apiCall } from '../api/config';
import { API_ENDPOINTS } from '../api/endpoints';

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch activities from /api/activities/ endpoint
        const data = await apiCall(API_ENDPOINTS.activities);
        setActivities(data.activities || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="text-center p-5"><p>Loading activities...</p></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Distance (km)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.userId?.username || 'Unknown'}</td>
              <td className="text-capitalize">{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.distance}</td>
              <td>{new Date(activity.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {activities.length === 0 && <p className="text-muted">No activities found</p>}
    </div>
  );
}
