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
  const data = rootKey ? payload?.[rootKey] ?? payload : payload;
  if (!data) {
    return [];
  }
  return Array.isArray(data)
    ? data
    : Array.isArray(data.items)
    ? data.items
    : [];
};

export const apiBaseUrl = getApiHost();
export const endpoints = {
  users: `${apiBaseUrl}/api/users/`,
  teams: `${apiBaseUrl}/api/teams/`,
  activities: `${apiBaseUrl}/api/activities/`,
  leaderboard: `${apiBaseUrl}/api/leaderboard/`,
  workouts: `${apiBaseUrl}/api/workouts/`,
};

export const fetchList = async (endpointOrKey, rootKey) => {
  let url = endpointOrKey;
  if (typeof endpointOrKey === 'string' && endpointOrKey.startsWith('/')) {
    url = `${apiBaseUrl}${endpointOrKey}`;
  } else if (endpoints[endpointOrKey]) {
    url = endpoints[endpointOrKey];
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to fetch ${rootKey || endpointOrKey}: ${response.statusText}`);
  }
  return parseListResponse(response, rootKey);
};

export const getNotes = () => {
  if (!codespaceName || codespaceName.trim().length === 0) {
    return 'VITE_CODESPACE_NAME is not defined. Falling back to http://localhost:8000 for development.';
  }
  return `API host: ${apiBaseUrl}`;
};
