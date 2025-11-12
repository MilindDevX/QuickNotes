# QuickNotes - Deployment Guide

## Prerequisites
- Supabase account with a PostgreSQL database
- Render account (for backend)
- Vercel account (for frontend)

## Backend Deployment (Render)

1. **Push your code to GitHub**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```

2. **Deploy on Render**
   - Go to https://render.com and sign in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: quicknotes-api
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Root Directory**: `server`
   
3. **Add Environment Variables** on Render:
   - `DATABASE_URL`: Your Supabase connection string (Transaction mode)
   - `DIRECT_URL`: Your Supabase direct connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: Leave empty (Render sets this automatically)

4. **Deploy** and copy your backend URL (e.g., `https://quicknotes-api.onrender.com`)

## Frontend Deployment (Vercel)

1. **Update API URL**
   - Update `client/src/api.js` to use your Render backend URL:
     ```javascript
     baseURL: 'https://YOUR-RENDER-URL.onrender.com/api'
     ```

2. **Deploy on Vercel**
   - Go to https://vercel.com and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   
3. **Deploy** and your app will be live!

## Environment Variables Summary

### Backend (.env on Render)
```
DATABASE_URL=postgresql://postgres.xxx:password@xxx.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
JWT_SECRET=your-super-secret-key-here
```

### Frontend (No env vars needed for basic setup)

## Testing

After deployment:
1. Visit your Vercel URL
2. Sign up for an account
3. Create, edit, and delete notes
4. Test the search functionality

## Troubleshooting

- **Backend not connecting to database**: Check DATABASE_URL format in Render
- **CORS errors**: Ensure backend CORS is configured correctly
- **Frontend can't reach backend**: Verify the API URL in `client/src/api.js`
