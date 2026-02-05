# Deploy Backend to Render.com

## Prerequisites
- GitHub account
- Render.com account (sign up at https://render.com)

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Add Render configuration"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `Canteen` repository

### 3. Configure Service

**Basic Settings:**
- **Name:** `canteen-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (spins down after 15 min inactivity)

### 4. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

```
NODE_ENV=production
JWT_SECRET=<generate-a-strong-random-string>
JWT_EXPIRES_IN=7d
PORT=5000
```

**Note:** Database variables (DB_NAME, DB_USERNAME, etc.) will be automatically set when you create the database.

### 5. Create PostgreSQL Database

1. From dashboard, click **"New +"** → **"PostgreSQL"**
2. **Name:** `canteen-db`
3. **Database:** `canteen`
4. **User:** `canteen`
5. **Region:** Same as web service
6. **Instance Type:** **"Free"**
7. Click **"Create Database"**

### 6. Connect Database to Web Service

1. Go back to your web service settings
2. Scroll to **"Environment"** section
3. Add these environment variables and link to database:
   - `DB_NAME` → From Database: `canteen-db` → Property: `database`
   - `DB_USERNAME` → From Database: `canteen-db` → Property: `user`
   - `DB_PASSWORD` → From Database: `canteen-db` → Property: `password`
   - `DB_HOST` → From Database: `canteen-db` → Property: `host`
   - `DB_PORT` → From Database: `canteen-db` → Property: `port`

### 7. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Run migrations
   - Start the server

### 8. Get Your API URL

Once deployed, your API will be available at:
```
https://canteen-backend.onrender.com
```

Test it:
```
https://canteen-backend.onrender.com/
```

## Alternative: Deploy Using render.yaml (Blueprint)

If you have `render.yaml` in your backend folder:

1. Go to Render Dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect `render.yaml` and set everything up
5. Add `JWT_SECRET` manually in environment variables

## Important Notes

### Free Tier Limitations
- ⚠️ **Service spins down after 15 minutes** of inactivity
- First request after sleep takes **30-60 seconds** (cold start)
- **750 hours/month** (enough for 24/7 single service)
- **Free PostgreSQL:** 90 days, then $7/month

### Keeping Service Awake (Optional)
Use a service like:
- **UptimeRobot** (https://uptimerobot.com) - Free
- **Cron-job.org** (https://cron-job.org) - Free

Ping your API every 14 minutes: `https://canteen-backend.onrender.com/`

### Database Migrations
Migrations run automatically on startup in `server.ts`.

### Logs
View logs in Render Dashboard → Your Service → "Logs" tab

## Update Frontend API URL

After deployment, update your Next.js frontend to use the Render URL:

**src/lib/api.ts:**
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://canteen-backend.onrender.com/api/v1';
```

Add to frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=https://canteen-backend.onrender.com/api/v1
```

## Troubleshooting

### Build Fails
- Check logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles locally: `npm run build`

### Database Connection Error
- Verify environment variables are set correctly
- Check database is in same region as web service
- Ensure database is running

### Migrations Fail
- Check Sequelize config in `backend/config/config.cjs`
- Verify migrations folder path is correct
- Check database credentials

## Rollback
Render keeps deployment history. Go to **"Events"** → Click previous deployment → **"Redeploy"**

## Custom Domain (Optional)
1. Go to service settings
2. Click **"Custom Domain"**
3. Add your domain and follow DNS instructions
