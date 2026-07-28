/**
 * API Configuration
 * Handles Codespaces and localhost environment detection
 */

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiConfig = {
  port,
  baseUrl: codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000',
  isCodespaces: !!codespaceName,
  environment: codespaceName ? 'codespaces' : 'local',
};

export default apiConfig;
