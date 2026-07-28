import express from 'express';
import './config/database';
import { apiConfig } from './config/api';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    baseUrl: apiConfig.baseUrl,
    environment: apiConfig.environment,
    port: apiConfig.port,
  });
});

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(apiConfig.port, () => {
  console.log(`OctoFit backend listening on port ${apiConfig.port}`);
  console.log(`Environment: ${apiConfig.environment}`);
  console.log(`Base URL: ${apiConfig.baseUrl}`);
});