import { useEffect, useState } from 'react';
import { fetchList, getNotes } from './ApiClient';

const Leaderboard = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endpoint =
    typeof import.meta.env.VITE_CODESPACE_NAME === 'string' &&
    import.meta.env.VITE_CODESPACE_NAME.trim().length > 0
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : '/api/leaderboard/';

  useEffect(() => {
    fetchList(endpoint, 'leaderboard')
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <p>{getNotes()}</p>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Total Distance</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5">No leaderboard entries found</td>
                </tr>
              ) : (
                items.map((entry, index) => (
                  <tr key={entry._id || index}>
                    <td>{entry.rank ?? index + 1}</td>
                    <td>{entry.userId?.name || entry.userId || 'Unknown'}</td>
                    <td>{entry.score ?? 0}</td>
                    <td>{entry.totalDistance ?? 0}</td>
                    <td>{entry.totalActivities ?? 0}</td>
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

export default Leaderboard;
