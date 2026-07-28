"use strict";
/**
 * API Configuration
 * Handles Codespaces and localhost environment detection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiConfig = {
    port,
    baseUrl: codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000',
    isCodespaces: !!codespaceName,
    environment: codespaceName ? 'codespaces' : 'local',
};
exports.default = exports.apiConfig;
