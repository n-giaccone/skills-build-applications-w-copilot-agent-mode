"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const api_1 = require("./config/api");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Codespaces detection: uses CODESPACE_NAME to build URL https://$CODESPACE_NAME-8000.app.github.dev
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        baseUrl: api_1.apiConfig.baseUrl,
        environment: api_1.apiConfig.environment,
        port: api_1.apiConfig.port,
    });
});
// Mount API routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.listen(api_1.apiConfig.port, () => {
    console.log(`OctoFit backend listening on port ${api_1.apiConfig.port}`);
    console.log(`Environment: ${api_1.apiConfig.environment}`);
    console.log(`Base URL: ${api_1.apiConfig.baseUrl}`);
});
