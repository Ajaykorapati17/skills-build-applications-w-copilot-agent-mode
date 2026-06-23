import { useEffect, useState } from 'react';
import { fetchList, getNotes } from './ApiClient';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endpoint = '/api/activities/';

  useEffect(() => {
    fetchList(endpoint, 'activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <p>{getNotes()}</p>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="6">No activities found</td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity._id || index}>
                    <td>{activity.type}</td>
                    <td>{activity.userId?.name || activity.userId || 'Unknown'}</td>
                    <td>{activity.distance ?? '—'}</td>
                    <td>{activity.duration ?? '—'}</td>
                    <td>{activity.calories ?? '—'}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
