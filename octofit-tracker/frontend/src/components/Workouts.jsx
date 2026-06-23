import { useEffect, useState } from 'react';
import { fetchList, getNotes } from './ApiClient';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList('/api/workouts/', 'workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <p>{getNotes()}</p>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>User</th>
                <th>Difficulty</th>
                <th>Exercises</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="5">No workouts found</td>
                </tr>
              ) : (
                workouts.map((workout, index) => (
                  <tr key={workout._id || index}>
                    <td>{workout.name}</td>
                    <td>{workout.userId?.name || workout.userId || 'Unknown'}</td>
                    <td>{workout.difficulty}</td>
                    <td>{Array.isArray(workout.exercises) ? workout.exercises.length : 0}</td>
                    <td>{workout.createdAt ? new Date(workout.createdAt).toLocaleDateString() : '—'}</td>
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

export default Workouts;
