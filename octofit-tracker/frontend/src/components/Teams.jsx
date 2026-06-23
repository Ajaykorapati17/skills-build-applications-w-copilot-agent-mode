import { useEffect, useState } from 'react';
import { fetchList, getNotes } from './ApiClient';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList('/api/teams', 'teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <p>{getNotes()}</p>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Leader</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="4">No teams found</td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team._id || index}>
                    <td>{team.name}</td>
                    <td>{team.leader?.name || team.leader || 'Unknown'}</td>
                    <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                    <td>{team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '—'}</td>
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

export default Teams;
