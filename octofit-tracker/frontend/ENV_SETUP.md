# Environment Setup for OctoFit Tracker Frontend

## Required Environment Variables

### VITE_CODESPACE_NAME
Used to construct the API endpoint for GitHub Codespaces.

**When to set:**
- Local development with Codespaces: Set to your codespace name (e.g., `my-codespace-name`)
- GitHub Codespaces: Automatically set by GitHub (no manual config needed)
- Local development without Codespaces: Leave empty or unset

**Format:**
```
VITE_CODESPACE_NAME=your-codespace-name
```

**Effect:**
- If set: API calls go to `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`
- If unset: API calls go to `http://localhost:8000`

## Setup Instructions

1. **Local Development (Localhost)**
   ```bash
   # Leave .env.local empty or unset VITE_CODESPACE_NAME
   # Frontend will connect to http://localhost:8000
   ```

2. **Local Development (Codespaces)**
   ```bash
   # Add to .env.local:
   VITE_CODESPACE_NAME=your-codespace-name
   # Frontend will connect to https://your-codespace-name-8000.app.github.dev
   ```

3. **GitHub Codespaces (Automatic)**
   ```bash
   # GitHub automatically sets VITE_CODESPACE_NAME
   # No manual configuration required
   ```
