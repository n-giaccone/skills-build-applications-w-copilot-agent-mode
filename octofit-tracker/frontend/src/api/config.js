/**
 * API Configuration for OctoFit Tracker Frontend
 * Handles Codespaces and localhost environment detection
 * 
 * Environment Setup:
 * - Define VITE_CODESPACE_NAME in .env.local (or GitHub Codespaces will set it automatically)
 * - Example .env.local:
 *   VITE_CODESPACE_NAME=my-codespace-name
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Codespace API endpoints
const getEndpointUrl = (endpoint) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${endpoint}`;
  }
  return `http://localhost:8000${endpoint}`;
};

export const apiConfig = {
  baseUrl,
  isCodespaces: !!codespaceName,
  environment: codespaceName ? 'codespaces' : 'local',
  getEndpointUrl,
};

/**
 * Fetch wrapper with error handling
 */
export const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${apiConfig.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

export default apiConfig;
