import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({ status: 'ok', baseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});