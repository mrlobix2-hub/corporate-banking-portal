# Corporate Banking Portal

Ye ek **personal corporate banking finance management web app** hai jo personal ledger aur remittance record management ke liye banaya gaya hai. Ye **real bank integration system nahi** hai.

## Custom Details
- App Name: **Corporate Banking Portal**
- Dashboard Title: **Corporate Banking Portal**
- Default Login ID: **MFCB0329**
- Default Password: **Ipconfig786@aaa**
- First login par password change lazmi hai.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + Lucide Icons
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Auth: JWT + bcrypt
- Uploads: Multer
- Security: Helmet + Rate Limiting + Validation
- PDF dependency: Puppeteer (statement feature ke liye future-ready)
- Deployment: Railway ready

## Project Structure
- `frontend/` -> React frontend
- `backend/` -> Express backend
- `database/` -> schema aur seed SQL files
- `uploads/receipts/` -> uploaded receipts
- `.env.example` -> environment variables sample

## Local Setup
1. `cp .env.example .env`
2. PostgreSQL database create karein
3. `database/schema.sql` run karein
4. `database/seed.sql` run karein
5. root par `npm install`
6. admin create karne ke liye:
   - `npm run seed-admin --workspace=backend`
7. local dev start:
   - `npm run dev`
8. browser me open karein:
   - `http://localhost:5173`

## Production Build
- `npm install`
- `npm run build`
- `npm start`

Production me Express frontend ka build `frontend/dist` se serve karega.

## Railway Deploy Summary
- New Project -> Deploy from GitHub
- PostgreSQL add karein
- Variables set karein:
  - `NODE_ENV=production`
  - `PORT=5000`
  - `FRONTEND_URL=https://your-app-domain.up.railway.app`
  - `DATABASE_URL=Railway PostgreSQL se auto ya copy`
  - `JWT_SECRET=strong_secret`
  - `DEFAULT_USERNAME=MFCB0329`
  - `DEFAULT_PASSWORD=Ipconfig786@aaa`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

## Important Honest Note
Is ZIP me **working foundation + functional dashboard/app structure** diya gaya hai. Lekin is size ke project ko deploy se pehle test karna zaroori hota hai. PDF statement ka polished bank-style final output aur kuch advanced flows abhi future enhancement level par hain.
