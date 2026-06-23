const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const hostFallback = 'localhost';

const getApiHost = () => {
  if (typeof codespaceName === 'string' && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return `http://${hostFallback}:8000`;
};

const parseListResponse = async (response, rootKey) => {
  const payload = await response.json();
  const data = payload?.[rootKey] ?? payload;
  if (!data) {
    return [];
  }
  return Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];
};

export const apiBaseUrl = getApiHost();
export const endpoints = {
  users: `${apiBaseUrl}/api/users/`,
  teams: `${apiBaseUrl}/api/teams/`,
  activities: `${apiBaseUrl}/api/activities/`,
  leaderboard: `${apiBaseUrl}/api/leaderboard/`,
  workouts: `${apiBaseUrl}/api/workouts/`,
};

export const fetchList = async (key) => {
  const response = await fetch(endpoints[key]);
  if (!response.ok) {
    throw new Error(`Unable to fetch ${key}: ${response.statusText}`);
  }
  return parseListResponse(response, key);
};

export const getNotes = () => {
  if (!codespaceName || codespaceName.trim().length === 0) {
    return 'VITE_CODESPACE_NAME is not defined. Falling back to http://localhost:8000 for development.';
  }
  return `API host: ${apiBaseUrl}`;
};
