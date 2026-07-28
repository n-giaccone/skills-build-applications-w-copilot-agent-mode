import { useState, useEffect } from 'react';
import { apiCall } from '../api/config';
import { API_ENDPOINTS } from '../api/endpoints';

// Direct endpoint string reference
const USERS_ENDPOINT = '/api/users/';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // API endpoint: /api/users/
  const usersEndpoint = API_ENDPOINTS.users;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users from /api/users/ endpoint
        const data = await apiCall(API_ENDPOINTS.users);
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center p-5"><p>Loading users...</p></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p className="text-muted">No users found</p>}
    </div>
  );
}
