# quantumkh-temp

## Run Locally

This project is a Vite + React app. You need Node.js and npm installed before starting.

The app expects these environment variables in `.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_BASE_URL`

### MacOS / Linux

```bash
cp .env.sample .env
npm install
npm run dev
```

### Windows PowerShell

```powershell
Copy-Item .env.sample .env
npm install
npm run dev
```

### Windows Command Prompt

```cmd
copy .env.sample .env
npm install
npm run dev
```

Vite will print a local URL in the terminal, usually `http://localhost:5173`. Open that URL in your browser to use the app.
